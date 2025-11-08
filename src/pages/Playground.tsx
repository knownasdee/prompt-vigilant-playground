import { useAppSelector } from "../app/hooks";
import type { RootState } from "../app/store";
import { PromptInput } from "../components/PromptInput";
import { ResponseCard } from "../components/ResponseCard";
import { MetricsBar } from "../components/MetricsBar";
import { Container, Stack, Center, Text } from "@mantine/core";

export function Playground() {
  const { list, loading } = useAppSelector((s: RootState) => s.responses);
  const { available } = useAppSelector((s: RootState) => s.models);

  // When loading, show cards for all models (some may be loading, some may have responses)
  const modelsToShow = loading
    ? available.map((model: string) => {
        const existingResponse = list.find((r) => r.model === model);
        return existingResponse
          ? { model, response: existingResponse.response, id: existingResponse.id, loading: false }
          : { model, response: undefined, id: `loading-${model}`, loading: true };
      })
    : list.map((r) => ({ model: r.model, response: r.response, id: r.id, loading: false }));

  return (
    <Center style={{ minHeight: "100vh", padding: "3rem 1.5rem", backgroundColor: "#FAFAFA" }}>
      <Container size="xl" style={{ width: "100%", maxWidth: "1200px" }}>
        <Stack gap="xl" py="xl">
          <Text ta="left" size="md" style={{ color: "#6B7280", fontWeight: 400, lineHeight: 1.6, marginBottom: "2rem" }}>
            Explore how different AI models respond to your prompts.
          </Text>
          <div style={{ marginBottom: "3rem" }}>
            <PromptInput />
          </div>
          <div style={{ marginBottom: "3rem" }}>
            <MetricsBar />
          </div>
          <Stack gap="lg">
            {modelsToShow.map((item: { model: string; response?: string; id: string; loading: boolean }) => (
              <ResponseCard
                key={item.id}
                model={item.model}
                response={item.response}
                loading={item.loading}
              />
            ))}
          </Stack>
        </Stack>
      </Container>
    </Center>
  );
}
