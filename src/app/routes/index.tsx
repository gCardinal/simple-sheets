import { createFileRoute } from "@tanstack/react-router";
import { getAllCharacterSheets } from "@libs/character-sheet";

export const Route = createFileRoute("/")({
  loader: async ({ context: { storage, registeredSystems } }) => {
    const characters = await getAllCharacterSheets(storage);

    return { characters, systems: registeredSystems };
  },
});
