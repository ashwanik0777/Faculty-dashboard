
import { useState, useEffect } from "react";

const RotatingQuotes = () => {
  const quotes = [
    "Teaching is the profession that creates all other professions.",
    "Education is the most powerful weapon which you can use to change the world.",
    "The art of teaching is the art of assisting discovery.",
    "Excellence in education is the only way to build a great nation."
  ];

  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [quotes.length]);

  return (
    <div className="bg-blue-600 text-white rounded-xl p-6 text-center">
      <p className="text-lg italic font-medium">
        "{quotes[currentQuote]}"
      </p>
    </div>
  );
};

export default RotatingQuotes;
