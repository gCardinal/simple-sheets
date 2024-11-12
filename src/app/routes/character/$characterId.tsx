import { assert, object, string } from "@libs/validation";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/character/$characterId")({
  component: CharacterId,
  loader: async ({
    context: { storage },
    params: { characterId },
  }): Promise<{ id: string; name: string }> => {
    const character = await storage.getItem(characterId);

    assert(character, object({ id: string(), name: string() }));

    return character;
  },
});

function CharacterId() {
  const character = Route.useLoaderData();

  return (
    <div className="p-2">
      <h3>{`Welcome ${character.name}!`}</h3>
    </div>
  );
}
