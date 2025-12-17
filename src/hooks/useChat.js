import { useState } from "react";
import { sendToWeatherAgent } from "../services/weatherApi";

export default function useChat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sendMessage = async (text) => {
    const userMessage = {
      role: "user",
      content: text,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setError("");

    try {
      const reply = await sendToWeatherAgent(text);

      const agentMessage = {
        role: "agent",
        content: reply,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, agentMessage]);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setError("");
  };

  return {
    messages,
    sendMessage,
    loading,
    error,
    clearChat,
  };
}
