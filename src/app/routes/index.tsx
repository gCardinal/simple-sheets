import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  loader: async ({ context: { sheetRepository, systemLoader } }) => {
    const characters = await sheetRepository.getAllCharacterSheets();

    return {
      characters,
      sheetRepository,
      systemLoader,
    };
  },
});
