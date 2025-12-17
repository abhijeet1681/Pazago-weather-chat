import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import SuggestedQuestions from "./SuggestedQuestions";
import ChatHistory from "./ChatHistory";
import useChat from "../hooks/useChat";
import useTheme from "../hooks/useTheme";

export default function ChatContainer() {
  const {
    threads,
    activeThread,
    activeThreadId,
    setActiveThreadId,
    sendMessage,
    startNewChat,
    deleteChat,
    loading,
    error,
  } = useChat();

  const { theme, toggleTheme } = useTheme();
  const bottomRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeThread?.messages, loading]);

  return (
    <div className="flex w-full max-w-6xl min-w-[320px] h-[90vh] 
                    border rounded-xl overflow-hidden
                    bg-white dark:bg-gray-900
                    border-gray-200 dark:border-gray-700">

      {/* LEFT: Chat History */}
      <ChatHistory
        threads={threads}
        activeThreadId={activeThreadId}
        onSelect={setActiveThreadId}
        onNewChat={startNewChat}
        onDelete={deleteChat}
      />

      {/* RIGHT: Active Chat */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <div className="flex justify-between items-center px-6 py-3 border-b dark:border-gray-700">
          <h1 className="text-sm font-semibold dark:text-white">
            Weather Agent
          </h1>

          <button
            onClick={toggleTheme}
            className="text-xs px-3 py-1 border rounded-lg
                       dark:text-white dark:border-gray-600"
          >
            {theme === "light" ? "Dark" : "Light"}
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {activeThread?.messages?.map((msg, index) => (
            <ChatMessage key={index} message={msg} />
          ))}

          {loading && (
            <div className="text-sm text-gray-400 italic">
              Weather agent is typing...
            </div>
          )}

          {error && (
            <div className="text-sm text-red-500">
              {error}
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Suggested Questions */}
        <SuggestedQuestions onSelect={sendMessage} />

        {/* Input */}
        <ChatInput onSend={sendMessage} disabled={loading} />
      </div>
    </div>
  );
}
