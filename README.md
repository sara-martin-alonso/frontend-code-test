# Frontend Code Test

## Features added

All features listed on the original README were added.

- [x] Add boxes
- [x] Remove boxes
- [x] Selected boxes
- [x] Drag a single box (selected or unselected) or drag multiple selected boxes.  
- [x] Change boxes color (single or multiple)
- [x] Display a counter indicating the numebr of selectex boxes.
- [x] App state is saved locally and restored on load.
- [x] Undo and redo buttons are available.

Also it was added:

- A "Remove all boxes" button to clean the canvas.
- Buttons are disabled if the action cannot be perfomed.

## Next steps

The code test was approached as a minimum viable product (MVP) due to the limited time available to dedicate, and the main focus was on deliver the expected funcionalities.

There are still many improvements to be made:

### Add Testing

This would be paramount for the maintainability of the code.

- [ ] Add unitary testing.
- [ ] Add end to end testing.
- [ ] Add Typescript.

### Code improvements

On the code side, we could:

- [ ] Split the css in different files.
- [ ] Replace css with scss.
- [ ] Improve the components folder (create reusable components if possible, split components that are too big into smaller ones...)

The app does not have an appealing user experience. There are many user interaction improvements to be, such as:

- [ ] Add confirmation modals on delete all boxes.
- [ ] Improve buttons sizes, colors, typographies, etc. to make it more readible and appealing.
- [ ] ...

### Libraries

If I were to continue working on the project, I would thoroughly review the documentation for the main libraries used (`interact.js` and `mobx-state-tree`).

I already have some issues on mind that I would work to improve:

- [ ] The Undo/Redo action does not work properly when dragging the boxes or updating the color. I tried using `startGroup` and `stopGroup` but this was the last feature that was added and I could not dedicate enough time to find a fix.
- [ ] There are some `.map` done inside the MainStore actions. I would dig more on the documentation to see if there is a way to handle this in the library that is more efficient.

## Ending Thoughts

I found the code test very interesting; working with libraries that I'm not used to work with was very refreshing.

There is so much room for improvement in the delivered app (not adding tests feels almost criminal to me), and I believe that the libraries have much more potential. However, I prioritized delivering the listed features first and left the additional improvements (testing, UX...) for future iterations.
