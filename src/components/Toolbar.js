import React from "react";
import store from "../stores/MainStore";
import uuid from "uuid/v4";
import getRandomColor from "../utils/getRandomColor";
import BoxModel from "../stores/models/Box";
import ToggleDragButton from "./ToggleDragButton";
import SelectedBoxesCounter from "./SelectedBoxesCounter";
import { observer } from "mobx-react";

function addBox() {
  const newBox = BoxModel.create({
    id: uuid(),
    color: getRandomColor(),
    left: 0,
    top: 0,
  });

  store.addBox(newBox);
}

function removeBox() {
  store.removeBox();
}

function updateColor(e) {
  store.updateColor(e.target.value);
}

function removeAllBoxes() {
  store.removeAllBoxes();
}

function Toolbar() {
  const areBoxesToRemove = store.boxesCount > 0;

  return (
    <div className="toolbar">
      <button onClick={addBox}>Add Box</button>
      <button onClick={removeBox} disabled={!areBoxesToRemove}>
        Remove Box
      </button>
      <button onClick={removeAllBoxes} disabled={!areBoxesToRemove}>
        Remove All Boxes
      </button>
      <input type="color" onInput={updateColor} />
      <ToggleDragButton />
      <SelectedBoxesCounter />
    </div>
  );
}

export default observer(Toolbar);
