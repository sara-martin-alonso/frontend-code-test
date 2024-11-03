import { types, onSnapshot } from "mobx-state-tree";
import uuid from "uuid/v4";
import { UndoManager } from "mst-middlewares";
import { values } from "mobx";

import BoxModel from "./models/Box";
import getRandomColor from "../utils/getRandomColor";
import { SAVED_STORE_KEY } from "../constants/localStorage";

const MainStore = types
  .model("MainStore", {
    boxes: types.array(BoxModel),
    shouldDragAllSelected: types.boolean,
    history: types.optional(UndoManager, {}),
  })
  .actions((self) => {
    setUndoManager(self);

    return {
      addBox(box) {
        self.boxes.push(box);
      },
      toggleBoxSelection(id) {
        const selectedBoxIndex = self.boxes.findIndex((box) => box.id === id);

        if (selectedBoxIndex !== -1) {
          self.boxes[selectedBoxIndex].isSelected =
            !self.boxes[selectedBoxIndex].isSelected;
        }
      },
      removeBox() {
        self.boxes = self.boxes.filter((box) => !box.isSelected);
      },
      dragBox(x, y, id) {
        if (self.shouldDragAllSelected) {
          self.boxes.forEach((box, index) => {
            if (box.isSelected) {
              self.boxes[index].dragBox(x, y);
            }
          });
        } else {
          const selectedBoxIndex = self.boxes.findIndex((box) => box.id === id);

          self.boxes[selectedBoxIndex].dragBox(x, y);
        }
      },
      updateColor(color) {
        self.boxes = self.boxes.map((box) => {
          if (box.isSelected) {
            return { ...box, color };
          }
          return box;
        });
      },
      updateShouldDragAllSelected() {
        store.shouldDragAllSelected = !store.shouldDragAllSelected;
      },
      removeAllBoxes() {
        store.boxes = [];
      },
    };
  })
  .views((self) => ({
    get selectedBoxesCount() {
      return values(self.boxes).filter((box) => box.isSelected).length;
    },
    get boxesCount() {
      return values(self.boxes).length;
    },
    get isUndoDisabled() {
      return self.history.undoLevels === 0;
    },
    get isRedoDisabled() {
      return self.history.redoLevels === 0;
    },
  }));

export let undoManager = {};
export const setUndoManager = (targetStore) => {
  undoManager = targetStore.history;
};

let initialState = {
  shouldDragAllSelected: false,
};

if (localStorage.getItem(SAVED_STORE_KEY)) {
  const json = JSON.parse(localStorage.getItem(SAVED_STORE_KEY));

  if (MainStore.is(json)) {
    initialState = json;
  }
}

const store = MainStore.create(initialState, {
  maxHistoryLength: 10,
  includeHooks: true,
});

if (!localStorage.getItem(SAVED_STORE_KEY)) {
  const box1 = BoxModel.create({
    id: uuid(),
    color: getRandomColor(),
    left: 0,
    top: 0,
    isSelected: false,
  });

  undoManager.withoutUndo(() => store.addBox(box1));
}

onSnapshot(store, (snapshot) => {
  localStorage.setItem(SAVED_STORE_KEY, JSON.stringify(snapshot));
});

export default store;
