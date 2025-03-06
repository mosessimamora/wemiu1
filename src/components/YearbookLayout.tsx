
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { MessageCircle, Users, Image, ChevronLeft } from "lucide-react";
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
    <div className="relative min-h-screen w-full bg-white overflow-hidden">
      {/* Background gradient effect - adjusted for white background */}
      <div className="absolute top-0 left-0 w-full h-full bg-white -z-10"></div>
      
      {/* Decorative elements - lighter for white background */}
      <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-yearbook-gold/5 blur-3xl -z-5"></div>
      <div className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-yearbook-gold/5 blur-3xl -z-5"></div>
      
      {/* Header */}
      {title && (
        <div className="flex items-center justify-between p-6">
          <Link to="/" className="flex items-center">
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
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={headerVariants}
            className="text-2xl font-semibold text-center text-yearbook-brown"
          >
            {title}
          </motion.h1>
          <div className="w-20"></div> {/* Spacer for centering */}
        </div>
      )}
      
      {/* Main content */}
      <main className="container mx-auto px-4 pb-20">
        {children}
      </main>
      
      {/* Navigation - fixed the Memories label text */}
      {showNav && (
        <motion.nav 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
          className="fixed bottom-0 left-0 right-0 bg-yearbook-brown/95 backdrop-blur-md text-white p-4 flex justify-around items-center z-50"
        >
          <Link to="/messages" className={`flex flex-col items-center gap-1 yearbook-nav-button ${location.pathname === '/messages' ? 'text-yearbook-gold' : 'text-white'}`}>
            <MessageCircle className="w-6 h-6" />
            <span className="text-xs text-center">Messages</span>
          </Link>
          <Link to="/members" className={`flex flex-col items-center gap-1 yearbook-nav-button ${location.pathname === '/members' ? 'text-yearbook-gold' : 'text-white'}`}>
            <Users className="w-6 h-6" />
            <span className="text-xs text-center">Members</span>
          </Link>
          <Link to="/memories" className={`flex flex-col items-center gap-1 yearbook-nav-button ${location.pathname === '/memories' ? 'text-yearbook-gold' : 'text-white'}`}>
            <Image className="w-6 h-6" />
            <span className="text-xs text-center">Memories</span>
          </Link>
        </motion.nav>
      )}
    </div>
  );
};

export default YearbookLayout;
