import React, { useRef } from "react";
import { observer } from "mobx-react";
import store from "../stores/MainStore";
import { useDraggable } from "../hooks/useDraggable";

const BASE_CLASS = "box";

function className(isSelected) {
  const classes = [BASE_CLASS];

  if (isSelected) {
    classes.push(`${BASE_CLASS}--selected`);
  }

  return classes.join(" ");
}

function BoxDraggable(props) {
  const boxRef = useRef(null);
  
  const handleOnClick = () => {
    store.toggleBoxSelection(props.id);
  };

  useDraggable(boxRef, props.id);

  return (
    <div
      ref={boxRef}
      id={props.id}
      className={className(props.isSelected)}
      style={{
        backgroundColor: props.color,
        width: props.width,
        height: props.height,
        transform: `translate(${props.left}px, ${props.top}px)`,
      }}
      onClick={handleOnClick}
    >
      {props.children}
    </div>
  );
}

export default observer(BoxDraggable);
