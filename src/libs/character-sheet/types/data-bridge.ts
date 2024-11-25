import { type CharacterSheet } from "../models";

/**
 * Bridge to facilitate communication between the renderer and
 * the app that is managing the character sheet. This allows
 * the app to use whatever storage mechanism it wants to use,
 * while still allowing the renderer to interact with the sheet
 * in a controlled manner.
 */
export type DataBridge = {
  saveSheet: (sheet: CharacterSheet) => void;
};
