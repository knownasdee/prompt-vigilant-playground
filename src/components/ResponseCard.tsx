import { Card, Text, Loader, Group } from "@mantine/core";

interface ResponseCardProps {
  model: string;
  response?: string;
  loading?: boolean;
}

// Model-specific styles - unique colors for each model
const getModelStyles = (model: string) => {
  const modelLower = model.toLowerCase();
  if (modelLower.includes("gpt")) {
    return {
      accentColor: "#10B981", // Emerald green
      borderColor: "rgba(16, 185, 129, 0.2)",
      background: "linear-gradient(135deg, rgba(16, 185, 129, 0.03) 0%, rgba(16, 185, 129, 0.01) 100%)",
      borderLeft: "3px solid #10B981",
    };
  } else if (modelLower.includes("claude")) {
    return {
      accentColor: "#F97316", // Orange
      borderColor: "rgba(249, 115, 22, 0.2)",
      background: "linear-gradient(135deg, rgba(249, 115, 22, 0.03) 0%, rgba(249, 115, 22, 0.01) 100%)",
      borderLeft: "3px solid #F97316",
    };
  } else if (modelLower.includes("mistral")) {
    return {
      accentColor: "#3B82F6", // Blue
      borderColor: "rgba(59, 130, 246, 0.2)",
      background: "linear-gradient(135deg, rgba(59, 130, 246, 0.03) 0%, rgba(59, 130, 246, 0.01) 100%)",
      borderLeft: "3px solid #3B82F6",
    };
  }
  return {
    accentColor: "#7B43A6",
    borderColor: "rgba(123, 67, 166, 0.2)",
    background: "linear-gradient(135deg, rgba(123, 67, 166, 0.03) 0%, rgba(123, 67, 166, 0.01) 100%)",
    borderLeft: "3px solid #7B43A6",
  };
};

export function ResponseCard({ model, response, loading }: ResponseCardProps) {
  const modelStyles = getModelStyles(model);

  return (
    <Card
      shadow="sm"
      padding="xl"
      radius="md"
      className="response-card"
      style={{
        border: `1px solid ${modelStyles.borderColor}`,
        borderLeft: modelStyles.borderLeft,
        background: `${modelStyles.background}, #FFFFFF`,
        transition: "all 0.3s ease",
        marginBottom: "1rem",
      }}
    >
      <Text 
        fw={700} 
        mb="md" 
        size="lg" 
        style={{ 
          lineHeight: 1.2,
          color: modelStyles.accentColor,
          fontSize: "1.125rem",
          letterSpacing: "-0.01em",
        }}
      >
        {model}
      </Text>
      {loading ? (
        <Group gap="sm" py="lg">
          <Loader size="sm" color={modelStyles.accentColor} />
          <Text size="sm" style={{ color: "#6B7280", fontWeight: 500 }}>
            Generating response...
          </Text>
        </Group>
      ) : (
        <Text 
          style={{ 
            lineHeight: 1.7, 
            color: "#1A1A1A",
            fontSize: "15px",
            fontWeight: 400,
            paddingTop: "0.25rem",
          }}
        >
          {response || "No response yet"}
        </Text>
      )}
    </Card>
  );
}
