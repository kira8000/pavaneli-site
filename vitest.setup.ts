import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// jsdom has no modal <dialog>. Mirror the two behaviours the app relies on:
// `open` toggles, and `close` fires a "close" event.
HTMLDialogElement.prototype.showModal = function showModal() {
  this.setAttribute("open", "");
};
HTMLDialogElement.prototype.close = function close() {
  this.removeAttribute("open");
  this.dispatchEvent(new Event("close"));
};

Element.prototype.scrollIntoView = function scrollIntoView() {
  // jsdom has no layout, so nothing to scroll.
};

afterEach(() => {
  cleanup();
});
