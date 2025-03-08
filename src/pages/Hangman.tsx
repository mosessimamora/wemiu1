
import { useState, useEffect } from "react";
import PageTransition from "../components/PageTransition";
import YearbookLayout from "../components/YearbookLayout";
import { motion } from "framer-motion";
import AudioPlayer from "../components/AudioPlayer";

// Sample quizzes with hints and images
const quizzes = [
  {
    word: "GIOVELLO",
    hint: "ketua kelas paling ganteng dan rajin😍😍😍",
    image: "/Giovello.jpg"
  },
  {
    word: "WILSON",
    hint: "Koko BUMN",
    image: "/Wilson.jpg"
  },
  {
    word: "OKTO",
    hint: "Pilar ke-4",
    image: "/Okto.jpg"
  },
  {
    word: "MOSES",
    hint: "Abang ganteng yang buat website ini :D",
    image: "/Moses.jpg"
  },
  {
    word: "TOBIAS",
    hint: "abang UNHAN",
    image: "/Tobias.jpg"
  }
  {
    word: "JOSHUA",
    hint: "Raja panco",
    image: "/Joshua.jpg"
  }
  {
    word: "NATHANAEL",
    hint: "sigma sigma boy",
    image: "/Nathanael.jpg"
  }
];

const QuizGame = () => {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [gameStatus, setGameStatus] = useState<"playing" | "correct" | "wrong">("playing");
  
  const currentQuiz = quizzes[currentQuizIndex];
  
  // Reset game when quiz changes
  useEffect(() => {
    setUserAnswer("");
    setGameStatus("playing");
  }, [currentQuizIndex]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (gameStatus !== "playing") return;
    
    const normalizedAnswer = userAnswer.trim().toUpperCase();
    const normalizedCorrectAnswer = currentQuiz.word.toUpperCase();
    
    if (normalizedAnswer === normalizedCorrectAnswer) {
      setGameStatus("correct");
    } else {
      setGameStatus("wrong");
    }
  };
  
  const nextQuiz = () => {
    if (currentQuizIndex < quizzes.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
    }
  };
  
  const resetQuiz = () => {
    setUserAnswer("");
    setGameStatus("playing");
  };
  
  // Create masked word display (M____S)
  const getMaskedWord = (word: string) => {
    const firstLetter = word[0];
    const lastLetter = word[word.length - 1];
    const middle = "_".repeat(word.length - 2);
    return `${firstLetter}${middle}${lastLetter}`;
  };
  
  return (
    <PageTransition>
      <YearbookLayout title="Tebak Siapa?">
        {/* Audio Player for this page */}
        <AudioPlayer audioSrc="/lovable-uploads/quiz-music.mp3" />
        
        <div className="max-w-2xl mx-auto py-8 px-4">
          {/* Quiz navigation - now just shows the quiz number */}
          <div className="flex justify-center items-center mb-6">
            <span className="text-yearbook-brown font-medium">
              Soal {currentQuizIndex + 1} dari {quizzes.length}
            </span>
          </div>
          
          {/* Text hint and masked word */}
          <div className="mb-6 space-y-6">
            <div className="space-y-3">
              <p className="text-center text-yearbook-brown bg-yearbook-gold/10 p-3 rounded-lg">
                <span className="font-semibold">Hint:</span> {currentQuiz.hint}
              </p>
              <p className="text-center text-2xl font-mono font-bold tracking-wider text-yearbook-brown">
                {getMaskedWord(currentQuiz.word)}
              </p>
            </div>
            
            {/* Image appears only after answering - Changed to object-contain to show full image */}
            {gameStatus !== "playing" && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full flex justify-center items-center"
              >
                <div className="w-full max-w-md mx-auto rounded-xl overflow-hidden mb-3">
                  <img 
                    src={currentQuiz.image} 
                    alt="Person" 
                    className="w-full h-auto object-contain"
                  />
                </div>
              </motion.div>
            )}
          </div>
          
          {/* Game status message */}
          {gameStatus !== "playing" && (
            <div className={`p-4 rounded-lg text-center text-white mb-6 ${
              gameStatus === "correct" ? "bg-green-500" : "bg-red-500"
            }`}>
              {gameStatus === "correct" 
                ? "🎉 BEH! Benar cuy!! Kelazz king!" 
                : `😔 ADOH! Bisa pulak salah ya! "${currentQuiz.word}"`
              }
            </div>
          )}
          
          {/* Answer form - only shown when playing */}
          {gameStatus === "playing" ? (
            <form onSubmit={handleSubmit} className="mb-8">
              <div className="space-y-4">
                <div>
                  <label htmlFor="answer" className="block text-yearbook-brown font-medium mb-2">
                    Jawaban
                  </label>
                  <input
                    type="text"
                    id="answer"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Ketik Jawabanmu Disini..."
                    className="w-full p-3 border border-yearbook-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-yearbook-gold/50"
                  />
                </div>
                
                <div className="flex flex-col space-y-2">
                  <button
                    type="submit"
                    disabled={!userAnswer.trim()}
                    className={`px-6 py-3 rounded-lg ${
                      !userAnswer.trim()
                        ? 'bg-yearbook-gold/30 text-white cursor-not-allowed'
                        : 'bg-yearbook-gold text-white hover:bg-yearbook-gold/90'
                    }`}
                  >
                    Kirim
                  </button>
                </div>
              </div>
            </form>
          ) : (
            /* Show Next Quiz and Try Again buttons after answering - regardless of correct/wrong */
            <div className="flex flex-col space-y-4 items-center">
              {currentQuizIndex < quizzes.length - 1 && (
                <button
                  onClick={nextQuiz}
                  className="px-8 py-3 bg-yearbook-gold text-white rounded-lg hover:bg-yearbook-gold/90 w-full max-w-xs"
                >
                  LANJOT
                </button>
              )}
              <button
                onClick={resetQuiz}
                className="px-8 py-3 bg-yearbook-brown text-white rounded-lg hover:bg-yearbook-brown/90 w-full max-w-xs"
              >
                COBA LAGI?
              </button>
            </div>
          )}
        </div>
      </YearbookLayout>
    </PageTransition>
  );
};

export default QuizGame;
