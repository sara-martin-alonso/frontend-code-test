import React from "react";
import { observer } from "mobx-react";
import store from "../stores/MainStore";

function ToggleDragButton() {
  function updateDragMode() {
    store.updateShouldDragAllSelected();
  }

  const text = store.shouldDragAllSelected
    ? "Single drag"
    : "Drag all selected";

  return <button onClick={updateDragMode}>{text}</button>;
}

export default observer(ToggleDragButton);
