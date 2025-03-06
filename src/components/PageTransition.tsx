
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export const pageVariants = {
  initial: {
    opacity: 0,
    x: "100vw",
  },
  in: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100,
    },
  },
  out: {
    opacity: 0,
    x: "-100vw",
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100,
    },
  },
};

const PageTransition = ({ children, className = "" }: PageTransitionProps) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className={`w-full min-h-screen ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
