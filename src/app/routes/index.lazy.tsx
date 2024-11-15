import {
  createLazyFileRoute,
  getRouteApi,
  Link,
  useNavigate,
} from "@tanstack/react-router";
import { useStorage } from "@libs/storage-react";
import { Button, Group, Modal, Select, Stack, TextInput } from "@libs/ui";
import { type FormEvent, useState } from "react";
import { createNewCharacterSheet } from "@libs/character-sheet";

const RouteApi = getRouteApi("/");

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const { characters, systems } = RouteApi.useLoaderData();
  const storage = useStorage();
  const navigate = useNavigate();
  const [isCreateNewCharacterModalOpen, setIsCreateNewCharacterModalOpen] =
    useState(false);

  const createCharacter = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // @todo: use form lib for validation here
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const system = formData.get("system") as string;

    const sheet = await createNewCharacterSheet(name, system, storage, systems);

    await navigate({ to: `/character/${sheet.id}` });
  };

  const openModal = () => setIsCreateNewCharacterModalOpen(true);
  const closeModal = () => setIsCreateNewCharacterModalOpen(false);

  return (
    <>
      <ul>
        {characters.map(({ id, name }) => (
          <li key={id}>
            <Link to={`/character/${id}`}>{name}</Link>
          </li>
        ))}
        <li>
          <Button onClick={openModal}>Create new</Button>
        </li>
      </ul>
      <Modal
        opened={isCreateNewCharacterModalOpen}
        onClose={closeModal}
        title="Create new character"
      >
        <form onSubmit={createCharacter}>
          <Stack>
            <TextInput name="name" label="Character Name" withAsterisk />
            <Select
              name="system"
              label="System"
              data={systems.map(({ name, slug }) => ({
                value: slug,
                label: name,
              }))}
              searchable
            />
            <Group justify="flex-end">
              <Button variant="light" onClick={closeModal}>
                Cancel
              </Button>
              <Button type="submit">Create</Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </>
  );
}
