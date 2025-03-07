
import { useState, useEffect } from "react";
import PageTransition from "../components/PageTransition";
import YearbookLayout from "../components/YearbookLayout";
import { motion } from "framer-motion";

// Sample quizzes with hints
const quizzes = [
  {
    word: "MEMORIES",
    hint: "What we're collecting in this yearbook",
    image: "/lovable-uploads/e6625db0-7317-40aa-8a24-675d2cac6260.png",
    letters: 8
  },
  {
    word: "FRIENDSHIP",
    hint: "The bond that keeps us together",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    letters: 10
  },
  {
    word: "GRADUATION",
    hint: "The ceremony we're all looking forward to",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    letters: 10
  },
  {
    word: "LEARNING",
    hint: "What we did together for years",
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    letters: 8
  },
  {
    word: "TEACHERS",
    hint: "Those who guided us through our journey",
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    letters: 8
  }
];

const QuizGame = () => {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [gameStatus, setGameStatus] = useState<"playing" | "correct" | "wrong">("playing");
  const [attempts, setAttempts] = useState(0);
  
  const currentQuiz = quizzes[currentQuizIndex];
  
  // Reset game when quiz changes
  useEffect(() => {
    setUserAnswer("");
    setGameStatus("playing");
    setAttempts(0);
  }, [currentQuizIndex]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (gameStatus !== "playing") return;
    
    const normalizedAnswer = userAnswer.trim().toUpperCase();
    const normalizedCorrectAnswer = currentQuiz.word.toUpperCase();
    
    if (normalizedAnswer === normalizedCorrectAnswer) {
      setGameStatus("correct");
    } else {
      setAttempts(prev => prev + 1);
      if (attempts >= 2) { // Allow 3 attempts (0, 1, 2)
        setGameStatus("wrong");
      }
    }
  };
  
  const nextQuiz = () => {
    if (currentQuizIndex < quizzes.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
    }
  };
  
  const prevQuiz = () => {
    if (currentQuizIndex > 0) {
      setCurrentQuizIndex(prev => prev - 1);
    }
  };
  
  const resetQuiz = () => {
    setUserAnswer("");
    setGameStatus("playing");
    setAttempts(0);
  };
  
  return (
    <PageTransition>
      <YearbookLayout title="Quiz Game">
        <div className="max-w-2xl mx-auto py-8 px-4">
          {/* Quiz navigation */}
          <div className="flex justify-between items-center mb-6">
            <button 
              onClick={prevQuiz}
              disabled={currentQuizIndex === 0}
              className={`px-4 py-2 rounded-full ${
                currentQuizIndex === 0 
                  ? 'bg-yearbook-gold/30 text-yearbook-brown/50 cursor-not-allowed' 
                  : 'bg-yearbook-gold text-white hover:bg-yearbook-gold/90'
              }`}
            >
              Previous
            </button>
            
            <span className="text-yearbook-brown font-medium">
              Quiz {currentQuizIndex + 1} of {quizzes.length}
            </span>
            
            <button 
              onClick={nextQuiz}
              disabled={currentQuizIndex === quizzes.length - 1}
              className={`px-4 py-2 rounded-full ${
                currentQuizIndex === quizzes.length - 1 
                  ? 'bg-yearbook-gold/30 text-yearbook-brown/50 cursor-not-allowed' 
                  : 'bg-yearbook-gold text-white hover:bg-yearbook-gold/90'
              }`}
            >
              Next
            </button>
          </div>
          
          {/* Image hint */}
          <div className="mb-6">
            <div className="aspect-video bg-yearbook-gold/10 rounded-xl overflow-hidden mb-3">
              <img 
                src={currentQuiz.image} 
                alt="Hint" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-3">
              <p className="text-center text-yearbook-brown bg-yearbook-gold/10 p-3 rounded-lg">
                <span className="font-semibold">Hint:</span> {currentQuiz.hint}
              </p>
              <p className="text-center text-yearbook-brown bg-yearbook-gold/10 p-3 rounded-lg">
                <span className="font-semibold">Letters:</span> {currentQuiz.letters}
              </p>
            </div>
          </div>
          
          {/* Game status message */}
          {gameStatus !== "playing" && (
            <div className={`p-4 rounded-lg text-center text-white mb-6 ${
              gameStatus === "correct" ? "bg-green-500" : "bg-red-500"
            }`}>
              {gameStatus === "correct" 
                ? "🎉 Congratulations! Your answer is correct!" 
                : `😔 Oh no! The correct answer was "${currentQuiz.word}"`
              }
            </div>
          )}
          
          {/* Answer form */}
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="space-y-4">
              <div>
                <label htmlFor="answer" className="block text-yearbook-brown font-medium mb-2">
                  Your Answer
                </label>
                <input
                  type="text"
                  id="answer"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  disabled={gameStatus !== "playing"}
                  placeholder="Type your answer here..."
                  className="w-full p-3 border border-yearbook-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-yearbook-gold/50"
                />
              </div>
              
              <div className="flex flex-col space-y-2">
                <button
                  type="submit"
                  disabled={gameStatus !== "playing" || !userAnswer.trim()}
                  className={`px-6 py-3 rounded-lg ${
                    gameStatus !== "playing" || !userAnswer.trim()
                      ? 'bg-yearbook-gold/30 text-white cursor-not-allowed'
                      : 'bg-yearbook-gold text-white hover:bg-yearbook-gold/90'
                  }`}
                >
                  Submit Answer
                </button>
                
                {gameStatus === "playing" && attempts > 0 && (
                  <p className="text-amber-600 text-center">
                    Attempts: {attempts}/3
                  </p>
                )}
              </div>
            </div>
          </form>
          
          {/* Reset button */}
          <div className="text-center">
            <button
              onClick={resetQuiz}
              className="px-8 py-3 bg-yearbook-gold text-white rounded-full hover:bg-yearbook-gold/90"
            >
              Reset Quiz
            </button>
          </div>
        </div>
      </YearbookLayout>
    </PageTransition>
  );
};

export default QuizGame;
