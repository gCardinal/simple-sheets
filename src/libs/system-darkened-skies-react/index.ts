import { render } from "./render.tsx";
import { type Renderer } from "@libs/character-sheet";

console.log("Darkened Skies renderer loaded");

export const renderer: Renderer = {
  slug: "darkened-skies",
  render,
};
