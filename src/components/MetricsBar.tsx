import { Card, Text } from "@mantine/core";

export function MetricsBar() {
  return (
    <Card
      shadow="sm"
      className="rounded-lg p-4 border border-gray-700/50"
    >
      <div className="flex flex-wrap justify-around gap-4 sm:gap-6">
        <Text size="sm" className="font-medium text-gray-300">
          Avg. Response Time: <span className="text-white">1.2s</span>
        </Text>
        <Text size="sm" className="font-medium text-gray-300">
          Tokens: <span className="text-white">124</span>
        </Text>
        <Text size="sm" className="font-medium text-gray-300">
          Models Tested: <span className="text-white">3</span>
        </Text>
      </div>
    </Card>
  );
}
