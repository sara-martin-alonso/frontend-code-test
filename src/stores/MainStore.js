import { types } from "mobx-state-tree";
import uuid from "uuid/v4";
import BoxModel from "./models/Box";
import getRandomColor from "../utils/getRandomColor";
import { values } from "mobx";

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

const store = MainStore.create({
  shouldDragAllSelected: false,
});

const box1 = BoxModel.create({
  id: uuid(),
  color: getRandomColor(),
  left: 0,
  top: 0,
  isSelected: false,
});

store.addBox(box1);

export default store;
