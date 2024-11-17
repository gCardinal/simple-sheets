import { type CharacterSheetClientOptions } from "../create-character-sheet-client";

const validateRenderersMatchWithSystem = (
  registrations: CharacterSheetClientOptions["registrations"],
) => {
  const matchErrors = [];
  for (const [systemRegistration, rendererRegistration] of registrations) {
    if (systemRegistration.slug !== rendererRegistration.system) {
      matchErrors.push([rendererRegistration.system, systemRegistration.slug]);
    }
  }

  if (matchErrors.length > 0) {
    throw new Error(
      `Renderer system mismatch: ${matchErrors.map(([renderer, system]) => `${renderer} -> ${system}`).join(", ")}`,
    );
  }
};

export const validateClientRegistrations = (
  registrations: CharacterSheetClientOptions["registrations"],
) => {
  validateRenderersMatchWithSystem(registrations);
};
