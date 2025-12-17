export default function ChatMessage({ message }) {
  const isUser = message.role === "user";
  const time = new Date(message.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] px-4 py-2 rounded-lg text-sm transition-all
          ${
            isUser
              ? "bg-black text-white dark:bg-white dark:text-black rounded-br-none"
              : "bg-gray-100 text-black dark:bg-gray-800 dark:text-white rounded-bl-none"
          }`}
      >
        <p>{message.content}</p>
        <span className="block text-xs mt-1 opacity-60 text-right">
          {time}
        </span>
      </div>
    </div>
  );
}
