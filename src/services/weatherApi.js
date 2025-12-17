export async function sendToWeatherAgent(message) {
  const response = await fetch(
    "https://brief-thousands-sunset-9fcb1c78-485f-4967-ac04-227599a8fa1462.mastra.cloud/api/agents/weatherAgent/stream",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        "x-mastra-dev-playground": "true",
      },
      body: JSON.stringify({
        messages: [{ role: "user", content: message }],
        runId: "weatherAgent",
        maxRetries: 2,
        maxSteps: 5,
        temperature: 0.5,
        topP: 1,
        runtimeContext: {},
        threadId: "2024510021",
        resourceId: "weatherAgent",
      }),
    }
  );

  if (!response.ok) throw new Error("API Error");

  return response.text();
}
