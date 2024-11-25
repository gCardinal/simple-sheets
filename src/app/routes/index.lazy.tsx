import {
  createLazyFileRoute,
  Link,
  useNavigate,
  useRouteContext,
} from "@tanstack/react-router";
import {
  Badge,
  Button,
  Group,
  Modal,
  Select,
  Stack,
  TextInput,
} from "@libs/ui";
import { type FormEvent, useState } from "react";
import { useCreateNewSheet, useDeleteSheet, useGetAllSheets } from "../sheets";

// const RouteApi = getRouteApi("/");

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  // const router = useRouter();
  // const { systemLoader } = RouteApi.useLoaderData();
  const { systemLoader } = useRouteContext({ from: "/" });
  const navigate = useNavigate();
  const [isCreateNewCharacterModalOpen, setIsCreateNewCharacterModalOpen] =
    useState(false);
  const sheets = useGetAllSheets();
  const createNewSheet = useCreateNewSheet();
  const deleteSheet = useDeleteSheet();

  const createCharacter = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // @todo: use form lib for validation here
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const system = formData.get("system") as string;

    const id = await createNewSheet(name, system);

    await navigate({ to: `/character/${id}` });
  };

  const deleteCharacter = async (id: string) => {
    await deleteSheet(id);
    // await router.invalidate({
    //   filter: ({ routeId }) => routeId === "/",
    // });
  };

  const openModal = () => setIsCreateNewCharacterModalOpen(true);
  const closeModal = () => setIsCreateNewCharacterModalOpen(false);

  return (
    <>
      <ul>
        {sheets.map(({ id, name, systemSlug }) => (
          <li key={id}>
            <Link to={`/character/${id}`}>{name}</Link>
            <Badge variant="outline" color="blue">
              {systemLoader.getRegisteredSystem(systemSlug).name}
            </Badge>
            <Button
              variant="subtle"
              color="red"
              onClick={() => {
                void deleteCharacter(id);
              }}
            >
              Delete
            </Button>
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
              data={systemLoader
                .getRegisteredSystems()
                .map(({ name, slug }) => ({
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
