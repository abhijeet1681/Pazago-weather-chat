export async function sendToWeatherAgent(prompt) {
  const response = await fetch("/api/api/webapp/agent/test-agent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
      stream: false,
    }),
  });

  if (!response.ok) {
    throw new Error("API request failed");
  }

  const data = await response.json();

  return (
    data.response ||
    data.result ||
    data.data ||
    data.output ||
    JSON.stringify(data)
  );
}
