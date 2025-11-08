import { ReactNode } from "react";
import { Container, Title } from "@mantine/core";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <Container size="md" py="xl">
      <Title order={2} ta="center" mb="xl">
        Prompt Playground
      </Title>
      {children}
    </Container>
  );
}
