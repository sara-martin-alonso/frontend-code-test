import { types } from "mobx-state-tree";
import uuid from "uuid/v4";
import BoxModel from "./models/Box";
import getRandomColor from "../utils/getRandomColor";

const MainStore = types
  .model("MainStore", {
    boxes: types.array(BoxModel),
  })
  .actions((self) => {
    return {
      addBox(box) {
        if (!!box) {
          self.boxes.push(box);
        }
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
        const selectedBoxIndex = self.boxes.findIndex((box) => box.id === id);

        self.boxes[selectedBoxIndex].dragBox(x, y);
      },
    };
  })
  .views((self) => ({}));

const store = MainStore.create();

const box1 = BoxModel.create({
  id: uuid(),
  color: getRandomColor(),
  left: 0,
  top: 0,
  isSelected: false,
});

store.addBox(box1);

export default store;
