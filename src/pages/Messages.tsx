import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PageTransition from "../components/PageTransition";
import YearbookLayout from "../components/YearbookLayout";
import { motion, AnimatePresence } from "framer-motion";
import AudioPlayer from "../components/AudioPlayer";

// Sample message data (placeholder with full-image background)
const messageData = [
  {
    id: 1,
    backgroundImage: "/Giovello.JPG",
    message: "selamat berpisah teman teman! selamat berpisah pada mu kekasih :)"
  },
  {
    id: 2,
    backgroundImage: "/Tobias.JPG",
    message: "see u on top"
  },
  {
    id: 3,
    backgroundImage: "/Moses.JPG",
    message: "i love you"
  },
  {
    id: 4,
    backgroundImage: "/Gavin.JPG",
    message: "semoga bisa masuk universitas impian"
  },
  {
    id: 5,
    backgroundImage: "/Nathanael.JPG",
    message: "jangan lupa sama metho"
  },
  {
    id: 6,
    backgroundImage: "/Okto.JPG",
    message: "tidak terasa 3 tahun berlalu begitu cepat"
  },
  {
    id: 7,
    backgroundImage: "/Raywen.JPG",
    message: "ingin rasanya memutar waktu kembali"
  },
  {
    id: 8,
    backgroundImage: "/Rowlly.JPG",
    message: "tapi boong"
  },
  {
    id: 9,
    backgroundImage: "/Joshua.JPG",
    message: "awkaokwokao"
  },
  {
    id: 10,
    backgroundImage: "/Manuel.JPG",
    message: "sukses selalu guyss!"
  }
];

const Messages = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);
  
  const nextMessage = () => {
    if (currentPage < messageData.length - 1) {
      setDirection(1);
      setCurrentPage(currentPage + 1);
    }
  };
  
  const prevMessage = () => {
    if (currentPage > 0) {
      setDirection(-1);
      setCurrentPage(currentPage - 1);
    }
  };
  
  const currentMessage = messageData[currentPage];
  
  const pageVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0
    })
  };
  
  const pageTransition = {
    type: "spring",
    stiffness: 300,
    damping: 30
  };

  // Handle swipe gestures
  const handleSwipe = (e: TouchEvent, startX: number) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    
    // If the swipe is more than 50px, consider it a navigation gesture
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextMessage(); // Swipe left, go to next
      } else {
        prevMessage(); // Swipe right, go to previous
      }
    }
  };

  // Set up swipe event listeners
  useEffect(() => {
    let startX = 0;
    
    const touchStartHandler = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };
    
    const touchEndHandler = (e: TouchEvent) => {
      handleSwipe(e, startX);
    };
    
    document.addEventListener('touchstart', touchStartHandler);
    document.addEventListener('touchend', touchEndHandler);
    
    return () => {
      document.removeEventListener('touchstart', touchStartHandler);
      document.removeEventListener('touchend', touchEndHandler);
    };
  }, [currentPage]); // Re-attach listeners when current page changes

  return (
    <PageTransition>
      <YearbookLayout title="Messages" showNav={true}>
        {/* Background Music Player */}
        <AudioPlayer audioSrc="/music.mp3" />
        
        <div className="flex flex-col items-center justify-center min-h-[80vh] relative px-0">
          {/* Page indicator */}
          <div className="absolute top-0 left-0 right-0 flex justify-center gap-1 mb-6 py-4 z-20">
            {messageData.map((_, index) => (
              <div 
                key={index}
                className={`h-1 rounded-full transition-all duration-300 ${
                  index === currentPage 
                    ? "w-6 bg-yearbook-gold" 
                    : "w-2 bg-yearbook-gold/30"
                }`}
              />
            ))}
          </div>
          
          {/* Full-screen message content */}
          <div className="w-full h-[80vh] relative overflow-hidden">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={currentPage}
                custom={direction}
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={pageTransition}
                className="absolute inset-0 w-full h-full"
              >
                {/* Full-screen background image with object-contain for desktop and object-cover for mobile */}
                <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-black">
                  <img
                    src={currentMessage.backgroundImage}
                    alt={`Message ${currentPage + 1}`}
                    className="w-full h-full md:object-contain object-cover"
                  />
                  {/* Dark overlay for better text readability */}
                  <div className="absolute inset-0 bg-black/30"></div>
                </div>
                
                {/* Message text overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent text-white">
                  <p className="text-lg leading-relaxed">
                    "{currentMessage.message}"
                  </p>
                  
                  <div className="mt-4 text-sm text-white/60">
                    {currentPage + 1} of {messageData.length}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Navigation buttons */}
            <div className="absolute top-1/2 left-0 right-0 flex justify-between -translate-y-1/2 px-4 pointer-events-none z-10">
              <button 
                onClick={prevMessage}
                disabled={currentPage === 0}
                className={`p-3 rounded-full bg-black/30 text-white pointer-events-auto ${
                  currentPage === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-100 cursor-pointer hover:bg-black/40'
                }`}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button 
                onClick={nextMessage}
                disabled={currentPage === messageData.length - 1}
                className={`p-3 rounded-full bg-black/30 text-white pointer-events-auto ${
                  currentPage === messageData.length - 1 ? 'opacity-30 cursor-not-allowed' : 'opacity-100 cursor-pointer hover:bg-black/40'
                }`}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </YearbookLayout>
    </PageTransition>
  );
};

export default Messages;
