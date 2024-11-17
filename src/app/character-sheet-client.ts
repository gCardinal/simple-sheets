import { storage } from "./storage.ts";
import { register as registerDndLegacySystem } from "@libs/system-dnd-legacy/register";
import { register as registerDndLegacyRenderer } from "@libs/system-dnd-legacy-react/register";
import { register as registerDarkenedSkiesSystem } from "@libs/system-darkened-skies/register";
import { register as registerDarkenedSkiesRenderer } from "@libs/system-darkened-skies-react/register";
import {
  type CharacterSheetClient,
  createCharacterSheetClient,
} from "@libs/character-sheet/create-character-sheet-client.ts";

export const characterSheetClient: CharacterSheetClient =
  createCharacterSheetClient({
    storage,
    registrations: [
      [registerDndLegacySystem(), registerDndLegacyRenderer()],
      [registerDarkenedSkiesSystem(), registerDarkenedSkiesRenderer()],
    ],
  });
