
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
    backgroundImage: "https://images.unsplash.com/photo-1517486808906-6ca8b3f8e1c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    message: "selamat berpisah teman teman!"
  },
  {
    id: 2,
    backgroundImage: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    message: "see u on top"
  },
  {
    id: 3,
    backgroundImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    message: "i love you"
  },
  {
    id: 4,
    backgroundImage: "https://images.unsplash.com/photo-1501349800519-48093d60bde0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    message: "semoga bisa masuk universitas impian"
  },
  {
    id: 5,
    backgroundImage: "https://images.unsplash.com/photo-1528716321680-815a8cdb8cbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    message: "jangan lupa sama metho"
  },
  {
    id: 6,
    backgroundImage: "https://images.unsplash.com/photo-1505245208761-ba872912fac0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    message: "tidak terasa 3 tahun berlalu begitu cepat"
  },
  {
    id: 7,
    backgroundImage: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    message: "ingin rasanya memutar waktu kembali"
  },
  {
    id: 8,
    backgroundImage: "https://images.unsplash.com/photo-1570215174562-8a176b46af8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    message: "tapi boong"
  },
  {
    id: 9,
    backgroundImage: "https://images.unsplash.com/photo-1569683795645-b62e50fbf103?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    message: "awkaokwokao"
  },
  {
    id: 10,
    backgroundImage: "https://images.unsplash.com/photo-1533287486341-f1383dea5388?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
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
        <AudioPlayer audioSrc="/lovable-uploads/messages-background.mp3" />
        
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
                {/* Full-screen background image */}
                <div 
                  className="absolute inset-0 w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${currentMessage.backgroundImage})` }}
                >
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
