import { types, onSnapshot } from "mobx-state-tree";
import uuid from "uuid/v4";
import BoxModel from "./models/Box";
import getRandomColor from "../utils/getRandomColor";
import { values } from "mobx";
import { SAVED_STORE_KEY } from "../constants/localStorage";

const MainStore = types
  .model("MainStore", {
    boxes: types.array(BoxModel),
    shouldDragAllSelected: types.boolean,
  })
  .actions((self) => {
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
    };
  })
  .views((self) => ({
    get selectedBoxesCount() {
      return values(self.boxes).filter((box) => box.isSelected).length;
    },
  }));

let initialState = {
  shouldDragAllSelected: false,
};

if (localStorage.getItem(SAVED_STORE_KEY)) {
  const json = JSON.parse(localStorage.getItem(SAVED_STORE_KEY));

  if (MainStore.is(json)) {
    initialState = json;
  }
}

const store = MainStore.create(initialState);

if (!localStorage.getItem(SAVED_STORE_KEY)) {
  const box1 = BoxModel.create({
    id: uuid(),
    color: getRandomColor(),
    left: 0,
    top: 0,
    isSelected: false,
  });

  store.addBox(box1);
}

onSnapshot(store, (snapshot) => {
  localStorage.setItem(SAVED_STORE_KEY, JSON.stringify(snapshot));
});

export default store;
