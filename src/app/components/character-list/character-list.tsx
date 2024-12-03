import { Badge, Button, Group, Paper, Stack, Text } from "@libs/ui";
import { linkOptions } from "@tanstack/react-router";
import type { FC } from "react";
import { Navigation } from "../navigation";

export interface CharacterListProps {
  characters: Array<{
    id: string;
    name: string;
    system: string;
  }>;
  onCharacterDeleteClicked: (id: string) => void;
}

export const CharacterList: FC<CharacterListProps> = ({
  characters,
  onCharacterDeleteClicked,
}) => {
  return (
    <Stack>
      {characters.map(({ id, name, system }) => (
        <Paper
          shadow="xs"
          display="flex"
          key={`character-list-character-${id}`}
        >
          <Navigation
            {...linkOptions({
              to: "/character/$characterId",
              params: {
                characterId: id,
              },
            })}
          >
            <Group flex={1} justify="space-between">
              <Text flex={1}>{name}</Text>
              <Group>
                <Badge variant="outline" color="blue">
                  {system}
                </Badge>
                <Button
                  variant="subtle"
                  color="red"
                  onClick={(event) => {
                    event.preventDefault(); // IMPORTANT. TEST THIS. Otherwise we navigate to nothing.
                    onCharacterDeleteClicked(id);
                  }}
                >
                  Delete
                </Button>
              </Group>
            </Group>
          </Navigation>
        </Paper>
      ))}
    </Stack>
  );
};
