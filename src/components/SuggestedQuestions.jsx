const questions = [
  "What's the weather in Mumbai today?",
  "Will it rain tomorrow in Pune?",
  "What's the temperature in Delhi right now?",
  "Show me the 7-day weather forecast for Bangalore.",
  "Is it going to be hot this weekend in Chennai?",
];

export default function SuggestedQuestions({ onSelect }) {
  return (
    <div className="px-6 py-3 space-y-2">
      {questions.map((q, i) => (
        <button
          key={i}
          onClick={() => onSelect(q)}
          className="w-full text-left border rounded-lg px-4 py-2 text-sm
                     hover:bg-gray-50 dark:hover:bg-gray-800
                     text-black dark:text-white
                     border-gray-300 dark:border-gray-600 transition"
        >
          {q}
        </button>
      ))}
    </div>
  );
}
