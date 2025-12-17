import { useState } from "react";
import { sendToWeatherAgent } from "../services/weatherApi";

export default function useChat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text) => {
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setLoading(true);

    try {
      const reply = await sendToWeatherAgent(text);
      setMessages((prev) => [...prev, { role: "agent", content: reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "agent", content: "Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return { messages, sendMessage, loading };
}
