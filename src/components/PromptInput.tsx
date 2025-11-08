import { useAppDispatch, useAppSelector } from "../app/hooks";
import type { RootState } from "../app/store";
import { setPrompt, savePrompt } from "../features/prompts/promptSlice";
import { setModel } from "../features/models/modelSlice";
import { startLoading, stopLoading, addResponse, clearResponses } from "../features/responses/responsesSlice";
import { runPrompt } from "../api/llmClient";
import { Button, Card, Group, Select, Textarea } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";

export function PromptInput() {
  const dispatch = useAppDispatch();
  const { current } = useAppSelector((s: RootState) => s.prompts);
  const { selected, available } = useAppSelector((s: RootState) => s.models);

  const handleRun = async () => {
    if (!current.trim()) return;
    
    // Save prompt
    dispatch(savePrompt());
    
    // Clear previous responses
    dispatch(clearResponses());
    
    // Start loading
    dispatch(startLoading());
    
    // Call runPrompt for all available models in parallel
    const promises = available.map(async (model: string) => {
      try {
        const response = await runPrompt(model, current);
        dispatch(addResponse({ model, response }));
      } catch (error) {
        console.error(`Error running prompt on ${model}:`, error);
        dispatch(addResponse({ model, response: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` }));
      }
    });
    
    // Wait for all promises to complete, then stop loading
    await Promise.all(promises);
    dispatch(stopLoading());
  };

  return (
    <Card
      shadow="md"
      className="rounded-lg p-6"
      style={{ position: "relative", overflow: "visible" }}
    >
      <Textarea
        placeholder="Enter your prompt..."
        autosize
        minRows={3}
        value={current}
        onChange={(e) => dispatch(setPrompt(e.currentTarget.value))}
        className="w-full"
        styles={{
          input: {
            border: "1px solid rgba(255, 255, 255, 0.1)",
            backgroundColor: "transparent",
          },
        }}
      />
      <Group
        justify="space-between"
        mt="md"
        className="flex-col sm:flex-row gap-4 sm:gap-0"
      >
        <div className="flex-1 sm:flex-initial w-full sm:w-auto" style={{ position: "relative", zIndex: 1 }}>
          <Select
            data={available}
            value={selected}
            onChange={(v) => dispatch(setModel(v || available[0]))}
            label="Select model"
            rightSection={<IconChevronDown size={14} />}
            comboboxProps={{ 
              shadow: "md",
              withinPortal: true,
            }}
            styles={{
              dropdown: {
                zIndex: 1000,
              },
            }}
          />
        </div>
        <Button onClick={handleRun} className="w-full sm:w-auto">
          Run
        </Button>
      </Group>
    </Card>
  );
}
