import { Text, Group } from "@mantine/core";

export function MetricsBar() {
  return (
    <Group justify="space-around" gap="xl" wrap="wrap" py="md">
        <Text 
          size="sm" 
          fw={500} 
          style={{ 
            lineHeight: 1.6,
            fontSize: "14px",
            color: "#6B7280",
          }}
        >
          Avg. Response Time: <Text span fw={700} style={{ color: "#7B43A6" }}>1.2s</Text>
        </Text>
        <Text 
          size="sm" 
          fw={500} 
          style={{ 
            lineHeight: 1.6,
            fontSize: "14px",
            color: "#6B7280",
          }}
        >
          Tokens: <Text span fw={700} style={{ color: "#7B43A6" }}>124</Text>
        </Text>
        <Text 
          size="sm" 
          fw={500} 
          style={{ 
            lineHeight: 1.6,
            fontSize: "14px",
            color: "#6B7280",
          }}
        >
          Models Tested: <Text span fw={700} style={{ color: "#7B43A6" }}>3</Text>
        </Text>
      </Group>
  );
}
