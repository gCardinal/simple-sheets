import {
  createLazyFileRoute,
  useNavigate,
  useRouteContext,
} from "@tanstack/react-router";
import { Button, Stack } from "@libs/ui";
import { useCreateNewSheet, useDeleteSheet, useGetAllSheets } from "../sheets";
import { CharacterList, CreateNewCharacterModal } from "../components";
import { type CreateNewCharacterFormData } from "../forms";
import { useDisclosure } from "@mantine/hooks";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const { registrar } = useRouteContext({ from: "/" });
  const navigate = useNavigate();
  const [isCreateNewCharacterModalOpen, { open, close }] = useDisclosure(false);
  const sheets = useGetAllSheets();
  const createNewSheet = useCreateNewSheet();
  const deleteSheet = useDeleteSheet();

  const createCharacter = async ({
    name,
    system,
  }: CreateNewCharacterFormData) => {
    const id = await createNewSheet(name, system);

    await navigate({
      to: "/character/$characterId",
      params: { characterId: id },
    });
  };

  const deleteCharacter = async (id: string) => {
    await deleteSheet(id);
  };

  return (
    <>
      <Stack>
        <CharacterList
          characters={sheets.map(({ id, name, systemSlug }) => ({
            id,
            name,
            system: registrar.getSystemRegister(systemSlug).name,
          }))}
          onCharacterDeleteClicked={deleteCharacter}
        />
        <Button onClick={open}>Create new</Button>
      </Stack>
      <CreateNewCharacterModal
        systems={registrar.getAllSystemRegisters().map((system) => system)}
        isOpen={isCreateNewCharacterModalOpen}
        onClose={close}
        onSuccessfulSubmit={createCharacter}
      />
    </>
  );
}
