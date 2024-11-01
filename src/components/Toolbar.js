import React from "react";
import store from "../stores/MainStore";
import uuid from "uuid/v4";
import getRandomColor from "../utils/getRandomColor";
import BoxModel from "../stores/models/Box";

function Toolbar() {
  const handleOnAddBox = () => {
    const newBox = BoxModel.create({
      id: uuid(),
      color: getRandomColor(),
      left: 0,
      top: 0,
    });

    store.addBox(newBox);
  };

  const handleOnRemoveBox = () => {
    store.removeBox();
  };

  return (
    <div className="toolbar">
      <button onClick={handleOnAddBox}>Add Box</button>
      <button onClick={handleOnRemoveBox}>Remove Box</button>
      <input type="color" />
      <span>No boxes selected</span>
    </div>
  );
}

export default Toolbar;
