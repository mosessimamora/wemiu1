
import { useState, useEffect, useCallback } from "react";
import PageTransition from "../components/PageTransition";
import YearbookLayout from "../components/YearbookLayout";
import { motion } from "framer-motion";

// Sample word puzzles with hints
const puzzles = [
  {
    word: "MEMORIES",
    hint: "What we're collecting in this yearbook",
    image: "/lovable-uploads/e6625db0-7317-40aa-8a24-675d2cac6260.png"
  },
  {
    word: "FRIENDSHIP",
    hint: "The bond that keeps us together",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    word: "GRADUATION",
    hint: "The ceremony we're all looking forward to",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    word: "LEARNING",
    hint: "What we did together for years",
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    word: "TEACHERS",
    hint: "Those who guided us through our journey",
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  }
];

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const Hangman = () => {
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [correctLetters, setCorrectLetters] = useState<string[]>([]);
  const [wrongLetters, setWrongLetters] = useState<string[]>([]);
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">("playing");
  
  const currentPuzzle = puzzles[currentPuzzleIndex];
  const currentWord = currentPuzzle.word;
  
  // Reset game when puzzle changes
  useEffect(() => {
    setGuessedLetters([]);
    setCorrectLetters([]);
    setWrongLetters([]);
    setGameStatus("playing");
  }, [currentPuzzleIndex]);
  
  // Check win/lose conditions
  useEffect(() => {
    if (gameStatus !== "playing") return;
    
    // Check if all letters are guessed correctly
    const isWon = currentWord.split('').every(letter => 
      guessedLetters.includes(letter)
    );
    
    if (isWon) {
      setGameStatus("won");
    } else if (wrongLetters.length >= 6) { // Allow 6 wrong guesses
      setGameStatus("lost");
    }
  }, [guessedLetters, wrongLetters, currentWord, gameStatus]);
  
  const handleLetterClick = useCallback((letter: string) => {
    if (gameStatus !== "playing" || guessedLetters.includes(letter)) return;
    
    const newGuessedLetters = [...guessedLetters, letter];
    setGuessedLetters(newGuessedLetters);
    
    if (currentWord.includes(letter)) {
      setCorrectLetters(prev => [...prev, letter]);
    } else {
      setWrongLetters(prev => [...prev, letter]);
    }
  }, [gameStatus, guessedLetters, currentWord]);
  
  const nextPuzzle = () => {
    if (currentPuzzleIndex < puzzles.length - 1) {
      setCurrentPuzzleIndex(prev => prev + 1);
    }
  };
  
  const prevPuzzle = () => {
    if (currentPuzzleIndex > 0) {
      setCurrentPuzzleIndex(prev => prev - 1);
    }
  };
  
  const resetPuzzle = () => {
    setGuessedLetters([]);
    setCorrectLetters([]);
    setWrongLetters([]);
    setGameStatus("playing");
  };
  
  return (
    <PageTransition>
      <YearbookLayout title="Word Puzzle">
        <div className="max-w-2xl mx-auto py-8 px-4">
          {/* Puzzle navigation */}
          <div className="flex justify-between items-center mb-6">
            <button 
              onClick={prevPuzzle}
              disabled={currentPuzzleIndex === 0}
              className={`px-4 py-2 rounded-full ${
                currentPuzzleIndex === 0 
                  ? 'bg-yearbook-gold/30 text-yearbook-brown/50 cursor-not-allowed' 
                  : 'bg-yearbook-gold text-white hover:bg-yearbook-gold/90'
              }`}
            >
              Previous
            </button>
            
            <span className="text-yearbook-brown font-medium">
              Puzzle {currentPuzzleIndex + 1} of {puzzles.length}
            </span>
            
            <button 
              onClick={nextPuzzle}
              disabled={currentPuzzleIndex === puzzles.length - 1}
              className={`px-4 py-2 rounded-full ${
                currentPuzzleIndex === puzzles.length - 1 
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
                src={currentPuzzle.image} 
                alt="Hint" 
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-center text-yearbook-brown bg-yearbook-gold/10 p-3 rounded-lg">
              <span className="font-semibold">Hint:</span> {currentPuzzle.hint}
            </p>
          </div>
          
          {/* Game status message */}
          {gameStatus !== "playing" && (
            <div className={`p-4 rounded-lg text-center text-white mb-6 ${
              gameStatus === "won" ? "bg-green-500" : "bg-red-500"
            }`}>
              {gameStatus === "won" 
                ? "🎉 Congratulations! You solved the puzzle!" 
                : `😔 Oh no! The word was "${currentWord}"`
              }
            </div>
          )}
          
          {/* Word display */}
          <div className="flex justify-center gap-2 flex-wrap mb-8">
            {currentWord.split('').map((letter, index) => (
              <div 
                key={index}
                className={`w-10 h-12 flex items-center justify-center border-b-2 
                  ${letter === ' ' 
                    ? 'border-transparent mx-2' 
                    : guessedLetters.includes(letter) 
                      ? 'border-yearbook-gold' 
                      : 'border-yearbook-brown/50'
                  }`}
              >
                <span className={`text-xl font-bold text-yearbook-brown ${
                  guessedLetters.includes(letter) ? 'opacity-100' : 'opacity-0'
                }`}>
                  {letter}
                </span>
              </div>
            ))}
          </div>
          
          {/* Alphabet buttons */}
          <motion.div 
            className="grid grid-cols-7 gap-2 mb-8"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.03
                }
              }
            }}
            initial="hidden"
            animate="show"
          >
            {alphabet.map((letter) => (
              <motion.button
                key={letter}
                onClick={() => handleLetterClick(letter)}
                disabled={guessedLetters.includes(letter) || gameStatus !== "playing"}
                className={`aspect-square rounded-md flex items-center justify-center text-lg font-semibold transition-all ${
                  guessedLetters.includes(letter)
                    ? correctLetters.includes(letter)
                      ? 'bg-green-100 text-green-700 border border-green-300'
                      : 'bg-red-100 text-red-700 border border-red-300'
                    : 'bg-yearbook-gold/10 text-yearbook-brown hover:bg-yearbook-gold/20 active:bg-yearbook-gold/30'
                }`}
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  show: { y: 0, opacity: 1 }
                }}
              >
                {letter}
              </motion.button>
            ))}
          </motion.div>
          
          {/* Reset button */}
          <div className="text-center">
            <button
              onClick={resetPuzzle}
              className="px-8 py-3 bg-yearbook-gold text-white rounded-full hover:bg-yearbook-gold/90"
            >
              Reset Puzzle
            </button>
          </div>
        </div>
      </YearbookLayout>
    </PageTransition>
  );
};

export default Hangman;
