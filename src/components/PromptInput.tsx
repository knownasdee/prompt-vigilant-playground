import { useAppDispatch, useAppSelector } from "../app/hooks";
import type { RootState } from "../app/store";
import { setPrompt, savePrompt } from "../features/prompts/promptSlice";
import { setModel } from "../features/models/modelSlice";
import { startLoading, stopLoading, addResponse, clearResponses } from "../features/responses/responsesSlice";
import { runPrompt } from "../api/llmClient";
import { Button, Group, NativeSelect, Textarea, Stack } from "@mantine/core";

export function PromptInput() {
  const dispatch = useAppDispatch();
  const { current } = useAppSelector((s: RootState) => s.prompts);
  const { selected, available } = useAppSelector((s: RootState) => s.models);
  const { loading } = useAppSelector((s: RootState) => s.responses);

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
    <Stack gap="xl" style={{ width: "100%" }}>
      <Textarea
        placeholder="Enter your prompt here..."
        autosize
        minRows={4}
        value={current}
        onChange={(e) => dispatch(setPrompt(e.currentTarget.value))}
        disabled={loading}
        styles={{
          root: {
            width: "100%",
          },
          input: {
            border: "2px solid rgba(0, 0, 0, 0.08)",
            backgroundColor: "#FFFFFF",
            fontSize: "16px",
            color: "#1A1A1A",
            transition: "all 0.3s ease",
            padding: "18px 20px",
            borderRadius: "12px",
            fontFamily: "inherit",
            lineHeight: "1.6",
            minWidth: "256px",
          },
        }}
      />
      <Group 
        justify="flex-end" 
        gap="md" 
        align="flex-end"
        wrap="wrap"
        className="prompt-input-controls"
      >
        <NativeSelect
          data={available}
          value={selected}
          onChange={(e) => dispatch(setModel(e.currentTarget.value))}
          label="Select model"
          disabled={loading}
          style={{ 
            flex: "1 1 auto",
            minWidth: "300px",
          }}
          styles={{
            input: {
              backgroundColor: "#FFFFFF",
              border: "1px solid rgba(0, 0, 0, 0.1)",
              color: "#1A1A1A",
              transition: "all 0.2s ease",
              borderRadius: "8px",
              minHeight: "40px",
              minWidth: "300px",
            },
            label: {
              fontWeight: 600,
              marginBottom: "8px",
              color: "#1A1A1A",
            },
          }}
        />
        <Button 
          onClick={handleRun} 
          disabled={loading || !current.trim()}
          loading={loading}
          size="lg"
          style={{ 
            flexShrink: 0,
            background: "#7B43A6",
            border: "none",
            fontWeight: 600,
            fontSize: "16px",
            padding: "14px 36px",
            borderRadius: "8px",
            minHeight: "32px",
            marginTop: "8px",
          }}
        >
          Run
        </Button>
      </Group>
    </Stack>
  );
}
