import React from "react";
import store from "../stores/MainStore";
import uuid from "uuid/v4";
import getRandomColor from "../utils/getRandomColor";
import BoxModel from "../stores/models/Box";
import { observer } from "mobx-react";

function updateDragMode() {
  store.updateShouldDragAllSelected();
}

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

  const handleOnUpdateColor = (e) => {
    store.updateColor(e.target.value);
  };

  const renderSelectedBoxesCounter = () => {
    if (store.selectedBoxesCount === 0) return <span>No boxes selected</span>;

    return <span>{store.selectedBoxesCount} boxes selected</span>;
  };

  const renderDragButton = () => {
    const text = store.shouldDragAllSelected
      ? "Drag all selected"
      : "Single drag";

    return <button onClick={updateDragMode}>{text}</button>;
  };

  return (
    <div className="toolbar">
      <button onClick={handleOnAddBox}>Add Box</button>
      <button onClick={handleOnRemoveBox}>Remove Box</button>
      <input type="color" onInput={handleOnUpdateColor} />
      {renderDragButton()}
      {renderSelectedBoxesCounter()}
    </div>
  );
}

export default observer(Toolbar);
