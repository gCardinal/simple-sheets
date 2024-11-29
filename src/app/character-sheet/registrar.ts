import { createRegistrar } from "@libs/character-sheet";
import { register as registerDndLegacySystem } from "@libs/system-dnd-legacy/register";
import { register as registerDndLegacyRenderer } from "@libs/system-dnd-legacy-react/register";
import { register as registerDarkenedSkiesSystem } from "@libs/system-darkened-skies/register";
import { register as registerDarkenedSkiesRenderer } from "@libs/system-darkened-skies-react/register";

export const registrar = createRegistrar([
  [registerDndLegacySystem(), registerDndLegacyRenderer()],
  [registerDarkenedSkiesSystem(), registerDarkenedSkiesRenderer()],
]);
