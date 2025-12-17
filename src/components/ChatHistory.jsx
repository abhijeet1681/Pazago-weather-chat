export default function ChatHistory({
  threads,
  activeThreadId,
  onSelect,
  onNewChat,
  onDelete,
}) {
  return (
    <div className="w-64 border-r dark:border-gray-700 p-4 space-y-3">

      {/* New Chat Button */}
      <button
        onClick={onNewChat}
        className="w-full bg-black text-white text-sm py-2 rounded-lg"
      >
        + New Chat
      </button>

      {/* History List */}
      <div className="space-y-1 overflow-y-auto max-h-[80vh]">
        {threads.map(thread => (
          <div
            key={thread.id}
            className={`flex items-center justify-between px-3 py-2 rounded-lg
              ${
                thread.id === activeThreadId
                  ? "bg-gray-200 dark:bg-gray-700"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
          >
            {/* Select Chat */}
            <button
              onClick={() => onSelect(thread.id)}
              className="text-sm truncate flex-1 text-left"
            >
              {thread.title}
            </button>

            {/* Delete Chat */}
            <button
              onClick={() => onDelete(thread.id)}
              className="ml-2 text-xs text-red-500 hover:text-red-700"
              title="Delete chat"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
