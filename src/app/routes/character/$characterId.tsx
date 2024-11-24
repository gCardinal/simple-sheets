import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/character/$characterId")({
  loader: async ({
    context: { sheetRepository, systemLoader, rendererLoader },
    params: { characterId },
  }) => {
    const character = await sheetRepository.getById(characterId);
    const renderer = await rendererLoader.load(character.systemSlug);
    const system = await systemLoader.load(character.systemSlug);

    return { character, renderer, system };
  },
});
