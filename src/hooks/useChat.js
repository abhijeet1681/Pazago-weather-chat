import { useEffect, useState } from "react";
import { sendToWeatherAgent } from "../services/weatherApi";

const STORAGE_KEY = "weather_chat_history";

export default function useChat() {
  // ✅ Load threads from localStorage ONCE
  const [threads, setThreads] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ Set active thread safely
  const [activeThreadId, setActiveThreadId] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    return parsed.length > 0 ? parsed[0].id : null;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Persist chats whenever threads change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(threads));
  }, [threads]);

  const activeThread = threads.find(t => t.id === activeThreadId);

  // ✅ Manual new chat
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

  // ✅ Delete chat (persistent)
  const deleteChat = (threadId) => {
    setThreads(prev => {
      const updated = prev.filter(t => t.id !== threadId);

      // If active chat deleted, switch safely
      if (threadId === activeThreadId) {
        setActiveThreadId(updated.length ? updated[0].id : null);
      }

      return updated;
    });
  };

  // ✅ SEND MESSAGE (AUTO-CREATE CHAT IF NONE EXISTS)
  const sendMessage = async (text) => {
    let threadId = activeThreadId;

    // 🔥 KEY FIX: auto-create chat if none exists
    if (!threadId) {
      const newThread = {
        id: Date.now(),
        title: text.slice(0, 30),
        messages: [],
        createdAt: Date.now(),
      };

      setThreads(prev => [newThread, ...prev]);
      setActiveThreadId(newThread.id);
      threadId = newThread.id;
    }

    const userMessage = {
      role: "user",
      content: text,
      timestamp: Date.now(),
    };

    // Add user message
    setThreads(prev =>
      prev.map(t =>
        t.id === threadId
          ? {
              ...t,
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

      // Add agent message
      setThreads(prev =>
        prev.map(t =>
          t.id === threadId
            ? {
                ...t,
                messages: [...t.messages, agentMessage],
              }
            : t
        )
      );
    } catch {
      setError("Failed to fetch response. Please try again.");
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
    deleteChat,
    loading,
    error,
  };
}
