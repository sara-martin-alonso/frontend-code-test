import React, { useRef } from "react";
import { observer } from "mobx-react";
import { useBoxEvents } from "../hooks/useBoxEvents";

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

  useBoxEvents(boxRef, props.id);

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
    >
      {props.children}
    </div>
  );
}

export default observer(BoxDraggable);
