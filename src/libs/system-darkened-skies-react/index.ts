import type { Renderer } from "@libs/character-sheet";
import { render } from "./render.tsx";

console.log("Darkened Skies renderer loaded");

export const renderer: Renderer = {
  slug: "darkened-skies",
  render,
};
