import { Card, Text, Loader } from "@mantine/core";

interface ResponseCardProps {
  model: string;
  response?: string;
  loading?: boolean;
}

// Model-specific gradient backgrounds
const getModelStyles = (model: string) => {
  const modelLower = model.toLowerCase();
  if (modelLower.includes("gpt")) {
    return "bg-gradient-to-br from-purple-900/20 to-purple-800/10 border-purple-500/20";
  } else if (modelLower.includes("claude")) {
    return "bg-gradient-to-br from-orange-900/20 to-orange-800/10 border-orange-500/20";
  } else if (modelLower.includes("mistral")) {
    return "bg-gradient-to-br from-blue-900/20 to-blue-800/10 border-blue-500/20";
  }
  return "bg-gradient-to-br from-gray-800/20 to-gray-700/10 border-gray-500/20";
};

export function ResponseCard({ model, response, loading }: ResponseCardProps) {
  const modelStyles = getModelStyles(model);

  return (
    <Card
      shadow="md"
      className={`rounded-lg p-6 mb-4 border ${modelStyles}`}
    >
      <Text fw={500} mb="sm" className="text-lg">
        {model}
      </Text>
      {loading ? (
        <div className="flex items-center gap-3 py-4">
          <Loader size="sm" />
          <Text size="sm" c="dimmed">Generating response...</Text>
        </div>
      ) : (
        <Text className="leading-relaxed" style={{ lineHeight: 1.5 }}>
          {response || "No response yet"}
        </Text>
      )}
    </Card>
  );
}
