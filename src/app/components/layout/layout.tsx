import { useDisclosure } from "@mantine/hooks";
import { AppShell, Burger, Container, Group, Stack, Text } from "@libs/ui";
import { Navigation } from "../navigation";
import { Outlet, useChildMatches } from "@tanstack/react-router";
import { type FC, Suspense } from "react";
import { TanStackRouterDevtools } from "../../routing";
import { config } from "@libs/config";

export const Layout: FC = () => {
  const [opened, { toggle }] = useDisclosure();
  const title = useChildMatches({
    select: (matches) => {
      const characterPageMatch = matches.find(
        (match) => match.routeId === "/character/$characterId",
      );

      return characterPageMatch?.loaderData?.character.name ?? "Simple Sheets";
    },
  });

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened, desktop: !opened },
      }}
      padding="md"
    >
      <AppShell.Header display="flex">
        <Group>
          <Burger opened={opened} onClick={toggle} size="sm" />
          {title}
        </Group>
      </AppShell.Header>

      <AppShell.Navbar>
        <Stack flex={1}>
          <Stack flex={1}>
            <Navigation onClick={toggle} to="/">
              Home
            </Navigation>
          </Stack>
          <Group justify="flex-end">
            <Text>{config.version}</Text>
          </Group>
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main>
        <>
          <Container>
            <Outlet />
          </Container>
          <Suspense>
            <TanStackRouterDevtools />
          </Suspense>
        </>
      </AppShell.Main>
    </AppShell>
  );
};
