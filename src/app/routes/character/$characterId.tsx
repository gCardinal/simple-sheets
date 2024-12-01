import { createFileRoute } from "@tanstack/react-router";
import { createDataBridge } from "../../character-sheet";

export const Route = createFileRoute("/character/$characterId")({
  loader: async ({
    context: { systemLoader, rendererLoader, sheetRepository },
    params: { characterId },
  }) => {
    const character = await sheetRepository.getById(characterId);

    if (!character) {
      throw new Error(`Character with id ${characterId} not found`);
    }

    const renderer = await rendererLoader.load(character.systemSlug);
    const system = await systemLoader.load(character.systemSlug);
    const bridge = createDataBridge(sheetRepository);

    // Character is returned here for parts of the UI to have
    // access to the basic information (name, system, etc.).
    return { renderer, system, bridge, character };
  },
});
