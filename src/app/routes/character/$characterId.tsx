import { createFileRoute } from "@tanstack/react-router";
import { getCharacterSheetById } from "@libs/character-sheet";
import { getSystemForCharacterSheet } from "@libs/character-sheet/api/get-system-for-character-sheet.ts";

export const Route = createFileRoute("/character/$characterId")({
  component: CharacterId,
  loader: async ({
    context: { storage, registeredSystems },
    params: { characterId },
  }) => {
    const character = await getCharacterSheetById(characterId, storage);
    const system = await getSystemForCharacterSheet(
      character,
      registeredSystems,
    );

    return { character, system };
  },
});

function CharacterId() {
  const { character, system } = Route.useLoaderData();

  return system.renderCharacterSheet(character);
}
