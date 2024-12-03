import type { CharacterSheet, System } from "../models";
import type { DataBridge } from "./data-bridge";

/**
 * A renderer is the object used to render a character sheet. It contains
 * the system slug for validations that a renderer is properly matched to
 * a system, otherwise that property is not used.
 *
 * It also exposes the render method which is used to render the character.
 * Return type is unknown since each renderer could require a different
 * return type -- React would return a JSX.Element, while a text renderer
 * would return a string.
 */
export interface Renderer {
  slug: string;
  render: (
    character: CharacterSheet,
    system: System,
    bridge: DataBridge,
  ) => unknown;
}
