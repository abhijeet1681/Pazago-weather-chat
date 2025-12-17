import { useState } from "react";

export default function ChatInput({ onSend, disabled }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="p-4 border-t flex gap-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        disabled={disabled}
        placeholder="Type your message..."
        className="flex-1 border rounded-lg px-4 py-2 outline-none"
      />
      <button
        onClick={handleSend}
        disabled={disabled}
        className="bg-black text-white px-4 rounded-lg"
      >
        →
      </button>
    </div>
  );
}
