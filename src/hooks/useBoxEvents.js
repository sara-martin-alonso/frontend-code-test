import { useEffect } from "react";
import interact from "interactjs";
import store from "../stores/MainStore";

function dragMoveListener(event, id) {
  store.dragBox(event.dx, event.dy, id);
}

function handleSelection(id) {
  store.toggleBoxSelection(id);
}

export const useBoxEvents = (ref, id) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    interact(element)
      .draggable({
        onmove: (event) => dragMoveListener(event, id),
      })
      .on("tap", () => {
        handleSelection(id);
      });

    return () => {
      interact(element).unset();
    };
  }, [ref, id]);
};
