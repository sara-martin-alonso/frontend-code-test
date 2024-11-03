import React from "react";
import { observer } from "mobx-react";
import store from "../stores/MainStore";

function ToggleDragButton(props) {
  function updateDragMode() {
    store.updateShouldDragAllSelected();
  }

  const text = store.shouldDragAllSelected
    ? "Single drag"
    : "Drag all selected";

  return (
    <button onClick={updateDragMode} disabled={props.isDisabled}>
      {text}
    </button>
  );
}

export default observer(ToggleDragButton);
