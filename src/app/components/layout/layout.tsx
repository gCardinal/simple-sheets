import { useDisclosure } from "@mantine/hooks";
import { AppShell, Burger, Group, Stack, Container } from "@libs/ui";
import { Navigation } from "../navigation";
import { Outlet, useChildMatches } from "@tanstack/react-router";
import { type FC, Suspense } from "react";
import { TanStackRouterDevtools } from "../../routing";

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
        <Stack>
          <Navigation onClick={toggle} to="/">
            Home
          </Navigation>
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
