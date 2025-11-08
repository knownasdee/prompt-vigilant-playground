/**
 * Mock LLM API client that simulates different delays per model
 * and returns simple mock outputs like reversing or uppercasing the prompt
 */

// Simulate different delays per model (in milliseconds)
const MODEL_DELAYS: Record<string, number> = {
  "gpt-4": 1500,
  "claude-3": 2000,
  "mistral-7b": 1000,
};

// Default delay if model not found
const DEFAULT_DELAY = 1500;

/**
 * Simulates running a prompt on a specific model
 * @param model - The model name
 * @param prompt - The prompt text
 * @returns Promise that resolves with a mock response
 */
export async function runPrompt(model: string, prompt: string): Promise<string> {
  const delay = MODEL_DELAYS[model] || DEFAULT_DELAY;
  
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, delay));
  
  // Generate mock response based on model
  let response: string;
  switch (model) {
    case "gpt-4":
      // Reverse the prompt
      response = prompt.split("").reverse().join("");
      break;
    case "claude-3":
      // Uppercase the prompt
      response = prompt.toUpperCase();
      break;
    case "mistral-7b":
      // Add prefix
      response = `[Mistral Response] ${prompt}`;
      break;
    default:
      response = `[${model}] Processed: ${prompt}`;
  }
  
  return response;
}

