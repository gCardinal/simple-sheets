import { render } from "./render.tsx";
import { type Renderer } from "@libs/character-sheet/models/renderer.ts";

export const renderer: Renderer = {
  slug: "darkened-skies",
  render,
};
