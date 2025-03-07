
import { Link } from "react-router-dom";
import { MessageCircle, Users, Image } from "lucide-react";
import { motion } from "framer-motion";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const buttonVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 }
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 }
  }
};

const Index = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-yearbook-cream text-yearbook-brown py-10 overflow-hidden">
      {/* Background effect */}
      <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-yearbook-gold/10 blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-yearbook-gold/10 blur-3xl"></div>
      
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="flex flex-col items-center text-center px-6 z-10"
      >
        {/* Logo - updated to use the provided image */}
        <motion.div 
          variants={itemVariants}
          className="mb-6"
        >
          <img 
            src="/lovable-uploads/6f78b5ca-80f1-4603-928d-bad706f31b75.png" 
            alt="EMWC Logo" 
            className="w-40 h-auto" 
          />
        </motion.div>
        
        {/* Subtitle */}
        <motion.h2 
          variants={itemVariants} 
          className="text-yearbook-brown/80 mb-1"
        >
          XII-1 Online Yearbook
        </motion.h2>
        
        {/* Main Title */}
        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-6xl font-bold mb-8 text-yearbook-brown"
        >
          The Wemiu Class
        </motion.h1>
        
        {/* Navigation Buttons - updated to center text */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col gap-4 w-full max-w-xs"
        >
          <Link to="/messages" className="w-full">
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="w-full flex items-center justify-center bg-yearbook-gold text-white px-6 py-4 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
            >
              <span className="text-lg font-medium mr-2">Sebuah Pesan Untukmu!</span>
              <MessageCircle className="w-5 h-5" />
            </motion.button>
          </Link>
          
          <Link to="/members" className="w-full">
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="w-full flex items-center justify-center bg-yearbook-gold text-white px-6 py-4 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
            >
              <span className="text-lg font-medium mr-2">Anggota Kelas</span>
              <Users className="w-5 h-5" />
            </motion.button>
          </Link>
          
          <Link to="/memories" className="w-full">
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="w-full flex items-center justify-center bg-yearbook-gold text-white px-6 py-4 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
            >
              <span className="text-lg font-medium mr-2">Kenangan Kita</span>
              <Image className="w-5 h-5" />
            </motion.button>
          </Link>

          <Link to="/hangman" className="w-full">
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="w-full flex items-center justify-center bg-yearbook-gold text-white px-6 py-4 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
            >
              <span className="text-lg font-medium mr-2">Quiz Game</span>
              <Users className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
        
        {/* Footer */}
        <motion.p 
          variants={itemVariants}
          className="mt-12 text-sm text-yearbook-brown/60 max-w-sm"
        >
          made with love by Moses Simamora
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Index;
