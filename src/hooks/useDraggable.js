import { useEffect } from "react";
import interact from "interactjs";
import store from "../stores/MainStore";

function dragMoveListener(event, id) {
  store.dragBox(event.dx, event.dy, id);
}

export const useDraggable = (ref, id) => {
  useEffect(() => {
    if (!!ref.current) {
      console.log(ref.current);
      interact(ref.current).draggable({
        onmove: (event) => dragMoveListener(event, id),
      });
    }

    return () => {
      interact(ref.current).unset();
    };
  }, [ref, id]);
};
