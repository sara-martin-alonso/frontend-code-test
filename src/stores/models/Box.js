import { types } from "mobx-state-tree";

const BoxModel = types
  .model("Box", {
    id: types.identifier,
    width: 200,
    height: 100,
    color: "#FFF000",
    left: 200,
    top: 100,
    isSelected: false,
  })
  .views(() => ({}))
  .actions((self) => {
    return {
      dragBox(x, y) {
        self.left = self.left + x;
        self.top = self.top + y;
      },
      updateColor(color) {
        self.color = color;
      },
    };
  });

export default BoxModel;
