import { createFileRoute } from "@tanstack/react-router";
import { assert, object, string } from "@libs/validation";

export const Route = createFileRoute("/")({
  loader: async ({
    context: { storage },
  }): Promise<Array<{ id: string; name: string }>> => {
    const keys = await storage.keys();
    const characters: Array<{ id: string; name: string }> = [];

    for (const key of keys) {
      const character = await storage.getItem(key);
      assert(character, object({ id: string(), name: string() }));
      characters.push(character);
    }

    return characters;
  },
});
