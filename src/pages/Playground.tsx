import { useAppSelector } from "../app/hooks";
import type { RootState } from "../app/store";
import { PromptInput } from "../components/PromptInput";
import { ResponseCard } from "../components/ResponseCard";
import { MetricsBar } from "../components/MetricsBar";
import { Title } from "@mantine/core";

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
    <div className="min-h-screen flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-2xl space-y-6">
        <Title order={1} className="text-2xl font-bold text-center mb-6">
          Prompt Playground
        </Title>
        <PromptInput />
        <MetricsBar />
        <div className="space-y-4">
          {modelsToShow.map((item: { model: string; response?: string; id: string; loading: boolean }) => (
            <ResponseCard
              key={item.id}
              model={item.model}
              response={item.response}
              loading={item.loading}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
