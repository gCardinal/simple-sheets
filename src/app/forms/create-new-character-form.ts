import { useForm } from "react-hook-form";
import { superstructResolver } from "@hookform/resolvers/superstruct";
import { object, string } from "@libs/validation";

export type CreateNewCharacterFormData = {
  name: string;
  system: string;
};

const schema = object({
  name: string(),
  system: string(),
});

export const useCreateNewCharacterForm = () => {
  return useForm<CreateNewCharacterFormData>({
    resolver: superstructResolver(schema),
  });
};
