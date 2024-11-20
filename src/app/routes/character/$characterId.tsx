import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/character/$characterId")({
  loader: async ({
    context: { sheetRepository, systemLoader, rendererLoader },
    params: { characterId },
  }) => {
    const character = await sheetRepository.getById(characterId);
    const renderer = await rendererLoader.get(character.system.slug);
    const system = await systemLoader.get(character.system.slug);

    return { character, renderer, system };
  },
});
