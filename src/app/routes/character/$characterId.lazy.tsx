import { createLazyFileRoute, getRouteApi } from "@tanstack/react-router";
import { useGetSheet } from "../../sheets";

const RouteApi = getRouteApi("/character/$characterId");

export const Route = createLazyFileRoute("/character/$characterId")({
  component: CharacterId,
});

function CharacterId() {
  const { characterId } = RouteApi.useParams();
  // using hook for live update when data changes
  const character = useGetSheet(characterId);
  const { renderer, system, bridge } = RouteApi.useLoaderData();

  if (!character) {
    return <div>Oops</div>;
  }

  return renderer.render(character, system, bridge);
}
