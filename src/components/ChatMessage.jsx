export default function ChatMessage({ message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] px-4 py-2 rounded-lg text-sm ${
          isUser
            ? "bg-black text-white rounded-br-none"
            : "bg-gray-100 text-black rounded-bl-none"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}
