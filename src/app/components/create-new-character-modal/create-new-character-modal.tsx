import { type FC } from "react";
import { Button, Group, Modal, Select, Stack, TextInput } from "@libs/ui";
import {
  type CreateNewCharacterFormData,
  useCreateNewCharacterForm,
} from "../../forms";
import { Controller } from "react-hook-form";

export interface CreateNewCharacterModalProps {
  isOpen: boolean;
  systems: Array<{ name: string; slug: string }>;
  onSuccessfulSubmit: (data: CreateNewCharacterFormData) => void;
  onClose: () => void;
}

export const CreateNewCharacterModal: FC<CreateNewCharacterModalProps> = ({
  isOpen,
  systems,
  onClose,
  onSuccessfulSubmit,
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useCreateNewCharacterForm();

  const onCloseHandler = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      opened={isOpen}
      onClose={onCloseHandler}
      title="Create new character"
    >
      <form onSubmit={handleSubmit(onSuccessfulSubmit)}>
        <Stack>
          <TextInput
            {...register("name")}
            label="Character Name"
            withAsterisk
          />

          <Controller
            name="system"
            control={control}
            render={({ field }) => (
              <Select
                label="System"
                data={systems.map(({ name, slug }) => ({
                  value: slug,
                  label: name,
                }))}
                searchValue={
                  systems.find(({ slug }) => slug === field.value)?.name
                }
                onChange={(value) => {
                  field.onChange(value);
                }}
                searchable
              />
            )}
          />
          <Group justify="flex-end">
            <Button variant="light" onClick={onCloseHandler}>
              Cancel
            </Button>
            <Button type="submit" disabled={!isValid}>
              Create
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};
