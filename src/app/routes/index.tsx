import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  loader: async ({ context: { characterSheetClient } }) => {
    const characters = await characterSheetClient.getAllCharacterSheets();

    return {
      characters,
      characterSheetClient,
    };
  },
});
