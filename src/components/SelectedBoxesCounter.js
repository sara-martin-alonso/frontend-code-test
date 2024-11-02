import React from "react";
import { observer } from "mobx-react";
import store from "../stores/MainStore";

function SelectedBoxesCounter() {
  if (store.selectedBoxesCount === 0) return <span>No boxes selected</span>;

  return <span>{store.selectedBoxesCount} boxes selected</span>;
}

export default observer(SelectedBoxesCounter);
