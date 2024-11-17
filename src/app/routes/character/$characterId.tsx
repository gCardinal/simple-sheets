import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/character/$characterId")({
  loader: async ({
    context: { characterSheetClient },
    params: { characterId },
  }) => {
    const character =
      await characterSheetClient.getCharacterSheetById(characterId);
    const renderer = await characterSheetClient.getRendererForSheet(character);
    const system = await characterSheetClient.getSystemForSheet(character);

    return { character, renderer, system };
  },
});
