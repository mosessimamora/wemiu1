
import { AudioProvider } from "./AudioContext";
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { MessageCircle, Users, Image, ChevronLeft, GamepadIcon } from "lucide-react";
import { motion } from "framer-motion";

interface YearbookLayoutProps {
  children: ReactNode;
  showNav?: boolean;
  title?: string;
}

const YearbookLayout = ({ children, showNav = true, title }: YearbookLayoutProps) => {
  const location = useLocation();
  
  // Animation variants for header elements
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <AudioProvider>
    <div className="relative min-h-screen w-full bg-white overflow-hidden">
      {/* Background gradient effect - adjusted for new color scheme */}
      <div className="absolute top-0 left-0 w-full h-full bg-yearbook-cream/40 -z-10"></div>
      
      {/* Decorative elements - lighter for white background */}
      <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-yearbook-gold/5 blur-3xl -z-5"></div>
      <div className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-yearbook-gold/5 blur-3xl -z-5"></div>
      
      {/* Only show header if title is provided and not empty */}
      {title && title.trim() !== "" && (
        <div className="flex items-center p-6 relative">
          {/* Back button aligned to the left */}
          <Link to="/" className="flex items-center z-10">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={headerVariants}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-5 h-5 text-yearbook-brown" />
              <span className="text-yearbook-brown font-medium">Back</span>
            </motion.div>
          </Link>
          
          {/* Title centered regardless of back button */}
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={headerVariants}
            className="text-2xl font-semibold text-center text-yearbook-brown absolute left-0 right-0 mx-auto"
          >
            {title}
          </motion.h1>
        </div>
      )}
      
      {/* Main content */}
      <main className="container mx-auto px-4 pb-20">
        {children}
      </main>
      
      {/* Navigation */}
      {showNav && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-yearbook-gold/20 px-4 py-3 z-40">
          <div className="container mx-auto max-w-md flex justify-between items-center">
            <Link 
              to="/members" 
              className={`flex flex-col items-center p-2 transition-colors ${
                location.pathname === "/members" 
                  ? "text-yearbook-gold"
                  : "text-yearbook-brown/60"
              }`}
              aria-label="Members"
            >
              <Users className="w-6 h-6" />
              <span className="text-xs mt-1">Members</span>
            </Link>
            
            <Link 
              to="/messages" 
              className={`flex flex-col items-center p-2 transition-colors ${
                location.pathname === "/messages" 
                  ? "text-yearbook-gold"
                  : "text-yearbook-brown/60"
              }`}
              aria-label="Messages"
            >
              <MessageCircle className="w-6 h-6" />
              <span className="text-xs mt-1">Messages</span>
            </Link>
            
            <Link 
              to="/" 
              className={`flex flex-col items-center p-2 transition-colors ${
                location.pathname === "/" 
                  ? "text-yearbook-gold"
                  : "text-yearbook-brown/60"
              }`}
              aria-label="Home"
            >
              <div className="w-12 h-12 bg-yearbook-gold rounded-full flex items-center justify-center -mt-8 border-4 border-white shadow-md">
                <span className="text-white font-bold">MIU</span>
              </div>
              <span className="text-xs mt-1">Home</span>
            </Link>
            
            <Link 
              to="/memories" 
              className={`flex flex-col items-center p-2 transition-colors ${
                location.pathname === "/memories" 
                  ? "text-yearbook-gold"
                  : "text-yearbook-brown/60"
              }`}
              aria-label="Memories"
              onClick={(e) => {
                // This ensures the click event is processed immediately
                if (location.pathname === "/memories") {
                  e.preventDefault();
                }
              }}
            >
              <Image className="w-6 h-6" />
              <span className="text-xs mt-1">Memories</span>
            </Link>
            
            <Link 
              to="/hangman" 
              className={`flex flex-col items-center p-2 transition-colors ${
                location.pathname === "/hangman" 
                  ? "text-yearbook-gold"
                  : "text-yearbook-brown/60"
              }`}
              aria-label="Quiz"
            >
              <GamepadIcon className="w-6 h-6" />
              <span className="text-xs mt-1">Quiz</span>
            </Link>
          </div>
        </div>
      )}
      
    </div>
    </AudioProvider>
  );
};

export default YearbookLayout;
