import { useState } from "react";

export default function ChatInput({ onSend, disabled }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="p-4 border-t flex gap-2 dark:border-gray-700">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        disabled={disabled}
        placeholder="Type your message..."
        className="flex-1 border rounded-lg px-4 py-2 text-sm outline-none
                   bg-white dark:bg-gray-800
                   text-black dark:text-white
                   border-gray-300 dark:border-gray-600"
      />
      <button
        onClick={handleSend}
        disabled={disabled}
        className={`px-4 rounded-lg ${
          disabled ? "bg-gray-400" : "bg-black text-white"
        }`}
      >
        →
      </button>
    </div>
  );
}
