import { createFileRoute } from "@tanstack/react-router";
import { getAllCharacterSheets } from "@libs/character-sheet";

export const Route = createFileRoute("/")({
  loader: async ({ context: { storage, characterSheetClient } }) => {
    const characters = await getAllCharacterSheets(storage);

    return {
      characters,
      storage,
      characterSheetClient,
    };
  },
});
