import {
  createLazyFileRoute,
  getRouteApi,
  Link,
  useNavigate,
} from "@tanstack/react-router";
import { useStorage } from "@libs/storage-react";
import { Button } from "@libs/ui";
import { nanoid } from "nanoid";

const RouteApi = getRouteApi("/");

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const { characters, systems } = RouteApi.useLoaderData();
  const storage = useStorage();
  const navigate = useNavigate();

  const createCharacter = async () => {
    const id = nanoid();
    await storage.setItem(id, { id, name: `Character ${id}` });
    await navigate({ to: `/character/${id}` });
  };

  return (
    <ul>
      {systems.map(({ name, slug }) => (
        <li key={slug}>{name}</li>
      ))}
      {characters.map(({ id, name }) => (
        <li key={id}>
          <Link to={`/character/${id}`}>{name}</Link>
        </li>
      ))}
      <li>
        <Button onClick={createCharacter}>Create new</Button>
      </li>
    </ul>
  );
}
