import { render } from "./render.tsx";
import { type Renderer } from "@libs/character-sheet";

console.log("D&D 5e (Legacy) renderer loaded");

export const renderer: Renderer = {
  slug: "dnd-legacy",
  render,
};
