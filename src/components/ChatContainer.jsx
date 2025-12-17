import { useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import SuggestedQuestions from "./SuggestedQuestions";
import useChat from "../hooks/useChat";

export default function ChatContainer() {
  const { messages, sendMessage, loading } = useChat();
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-full max-w-3xl h-[90vh] flex flex-col border rounded-xl shadow-sm">
      
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      <SuggestedQuestions onSelect={sendMessage} />

      {/* Input */}
      <ChatInput onSend={sendMessage} disabled={loading} />
    </div>
  );
}
