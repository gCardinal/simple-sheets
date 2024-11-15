import { createLazyFileRoute, getRouteApi } from "@tanstack/react-router";

const RouteApi = getRouteApi("/character/$characterId");

export const Route = createLazyFileRoute("/character/$characterId")({
  component: CharacterId,
});

function CharacterId() {
  const { character, system } = RouteApi.useLoaderData();

  return system.renderCharacterSheet(character);
}
