import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import SuggestedQuestions from "./SuggestedQuestions";
import useChat from "../hooks/useChat";
import useTheme from "../hooks/useTheme";

export default function ChatContainer() {
  const { messages, sendMessage, loading, error, clearChat } = useChat();
  const { theme, toggleTheme } = useTheme();

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="w-full max-w-3xl min-w-[320px] h-[90vh]
                    border rounded-xl shadow-sm flex flex-col
                    bg-white dark:bg-gray-900
                    border-gray-200 dark:border-gray-700">

      {/* Header */}
      <div className="flex justify-between items-center px-6 py-3 border-b dark:border-gray-700">
        <h1 className="text-sm font-semibold dark:text-white">
          Weather Agent
        </h1>

        <div className="flex gap-3">
          <button
            onClick={toggleTheme}
            className="text-xs px-3 py-1 border rounded-lg
                       dark:text-white dark:border-gray-600"
          >
            {theme === "light" ? "Dark" : "Light"}
          </button>

          <button
            onClick={clearChat}
            className="text-xs text-gray-500 hover:text-black dark:text-gray-400"
          >
            Clear chat
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((msg, i) => (
          <ChatMessage key={i} message={msg} />
        ))}

        {loading && (
          <div className="text-sm text-gray-400 italic">
            Weather agent is typing...
          </div>
        )}

        {error && (
          <div className="text-sm text-red-500 text-center">
            {error}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <SuggestedQuestions onSelect={sendMessage} />
      <ChatInput onSend={sendMessage} disabled={loading} />
    </div>
  );
}
