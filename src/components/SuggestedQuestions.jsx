const questions = [
  "What's the weather in Mumbai today?",
  "Will it rain tomorrow in Pune?",
  "What's the temperature in Delhi right now?",
  "Show me the 7-day weather forecast for Bangalore.",
  "Is it going to be hot this weekend in Chennai?"
];

export default function SuggestedQuestions({ onSelect }) {
  return (
    <div className="px-6 py-3 space-y-2">
      {questions.map((question, index) => (
        <button
          key={index}
          onClick={() => onSelect(question)}
          className="w-full text-left border rounded-lg px-4 py-2 text-sm 
                     hover:bg-gray-50 transition"
        >
          {question}
        </button>
      ))}
    </div>
  );
}
