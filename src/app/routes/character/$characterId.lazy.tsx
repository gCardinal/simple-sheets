import { createLazyFileRoute, getRouteApi } from "@tanstack/react-router";
import { useGetSheet } from "../../sheets";

const RouteApi = getRouteApi("/character/$characterId");

export const Route = createLazyFileRoute("/character/$characterId")({
  component: CharacterId,
});

function CharacterId() {
  const { renderer, system, bridge, character } = RouteApi.useLoaderData();
  // Even though loader gives us the character, we still use the information
  // coming from the hook since the hook will update the value whenever
  // changes are made.
  const sheet = useGetSheet(character.id);

  if (!sheet) {
    return <div>Oops</div>;
  }

  return renderer.render(sheet, system, bridge);
}
