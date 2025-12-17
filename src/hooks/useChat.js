import { useEffect, useState } from "react";
import { sendToWeatherAgent } from "../services/weatherApi";

const STORAGE_KEY = "weather_chat_history";

export default function useChat() {
  const [threads, setThreads] = useState([]);
  const [activeThreadId, setActiveThreadId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load history on first load
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    setThreads(saved);
    if (saved.length) {
      setActiveThreadId(saved[0].id);
    }
  }, []);

  // Persist history
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(threads));
  }, [threads]);

  const activeThread = threads.find(t => t.id === activeThreadId);

  const startNewChat = () => {
    const newThread = {
      id: Date.now(),
      title: "New chat",
      messages: [],
      createdAt: Date.now(),
    };
    setThreads(prev => [newThread, ...prev]);
    setActiveThreadId(newThread.id);
  };

  const deleteChat = (threadId) => {
    setThreads(prev => {
      const updated = prev.filter(t => t.id !== threadId);

      // If deleted chat was active
      if (threadId === activeThreadId) {
        if (updated.length > 0) {
          setActiveThreadId(updated[0].id);
        } else {
          // No chats left → create new one
          const newThread = {
            id: Date.now(),
            title: "New chat",
            messages: [],
            createdAt: Date.now(),
          };
          setActiveThreadId(newThread.id);
          return [newThread];
        }
      }

      return updated;
    });
  };

  const sendMessage = async (text) => {
    if (!activeThread) return;

    const userMessage = {
      role: "user",
      content: text,
      timestamp: Date.now(),
    };

    setThreads(prev =>
      prev.map(t =>
        t.id === activeThreadId
          ? {
              ...t,
              title: t.messages.length === 0 ? text.slice(0, 30) : t.title,
              messages: [...t.messages, userMessage],
            }
          : t
      )
    );

    setLoading(true);
    setError("");

    try {
      const reply = await sendToWeatherAgent(text);

      const agentMessage = {
        role: "agent",
        content: reply,
        timestamp: Date.now(),
      };

      setThreads(prev =>
        prev.map(t =>
          t.id === activeThreadId
            ? { ...t, messages: [...t.messages, agentMessage] }
            : t
        )
      );
    } catch {
      setError("Failed to fetch response.");
    } finally {
      setLoading(false);
    }
  };

  return {
    threads,
    activeThread,
    activeThreadId,
    setActiveThreadId,
    sendMessage,
    startNewChat,
    deleteChat,   // 👈 NEW
    loading,
    error,
  };
}
