import type { Renderer } from "@libs/character-sheet";
import { render } from "./render.tsx";

console.log("D&D 5e (Legacy) renderer loaded");

export const renderer: Renderer = {
  slug: "dnd-legacy",
  render,
};
