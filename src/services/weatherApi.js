export async function sendToWeatherAgent(prompt) {
  const requestPayload = {
    prompt: prompt,
    stream: false,
  };

  console.log("API Request Payload:", requestPayload);

  const response = await fetch(
    "https://api-dev.provue.ai/api/webapp/agent/test-agent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestPayload),
    }
  );

  if (!response.ok) {
    console.error("API Response Status:", response.status);
    throw new Error("API request failed");
  }

  const data = await response.json();
  console.log("API Response:", data);

  return (
  data?.data?.response ||
  "No response from server"
);

}
