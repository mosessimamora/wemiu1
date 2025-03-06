
import { useState } from "react";
import PageTransition from "../components/PageTransition";
import YearbookLayout from "../components/YearbookLayout";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Instagram, MessageCircle } from "lucide-react";
import AudioPlayer from "../components/AudioPlayer";

// Sample student data with multiple photos
const students = Array.from({ length: 36 }, (_, index) => ({
  id: index + 1,
  name: `Student ${index + 1}`,
  photos: [
    "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  ],
  quote: "\"The future belongs to those who believe in the beauty of their dreams.\"",
  instagram: "student" + (index + 1),
  whatsapp: "62812345678" + (index < 10 ? "0" + (index + 1) : (index + 1))
}));

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

const Members = () => {
  const [selectedStudent, setSelectedStudent] = useState<typeof students[0] | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedStudent) {
      setCurrentPhotoIndex((prev) => 
        prev === selectedStudent.photos.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedStudent) {
      setCurrentPhotoIndex((prev) => 
        prev === 0 ? selectedStudent.photos.length - 1 : prev - 1
      );
    }
  };

  const resetAndClose = () => {
    setSelectedStudent(null);
    setCurrentPhotoIndex(0);
  };

  return (
    <PageTransition>
      <YearbookLayout showNav={true} title="">
        {/* Background Music Player */}
        <AudioPlayer audioSrc="/lovable-uploads/members-background.mp3" />
        
        <div className="py-4 mt-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {students.map((student) => (
              <motion.div
                key={student.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="student-card"
                onClick={() => setSelectedStudent(student)}
              >
                <div className="aspect-square overflow-hidden bg-yearbook-gold/10">
                  <img
                    src={student.photos[0]}
                    alt={student.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-3 bg-yearbook-gold/5">
                  <h3 className="font-medium text-yearbook-brown truncate">{student.name}</h3>
                  <p className="text-yearbook-brown/70 text-sm truncate">@{student.instagram}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Student Detail Modal with Photo Slider */}
        {selectedStudent && (
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={resetAndClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white rounded-xl overflow-hidden shadow-xl max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full aspect-square bg-yearbook-gold/10">
                <img
                  src={selectedStudent.photos[currentPhotoIndex]}
                  alt={selectedStudent.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Photo slider controls */}
                <button 
                  onClick={prevPhoto}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 p-2 rounded-full text-white hover:bg-black/50 transition"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={nextPhoto}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 p-2 rounded-full text-white hover:bg-black/50 transition"
                >
                  <ChevronRight size={20} />
                </button>
                
                {/* Photo indicator dots */}
                <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
                  {selectedStudent.photos.map((_, index) => (
                    <span 
                      key={index}
                      className={`w-2 h-2 rounded-full ${currentPhotoIndex === index ? 'bg-white' : 'bg-white/50'}`}
                    />
                  ))}
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-yearbook-brown mb-2">
                  {selectedStudent.name}
                </h2>
                
                {/* Quote Section */}
                <div className="mb-6 p-4 bg-yearbook-gold/5 rounded-lg border border-yearbook-gold/10">
                  <p className="text-yearbook-brown/80 italic">
                    {selectedStudent.quote}
                  </p>
                </div>
                
                {/* Social Media Links */}
                <div className="space-y-3">
                  <a 
                    href={`https://instagram.com/${selectedStudent.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-yearbook-brown/70 hover:text-yearbook-brown"
                  >
                    <Instagram className="w-5 h-5 text-yearbook-brown" />
                    <span>@{selectedStudent.instagram}</span>
                  </a>
                  
                  <a 
                    href={`https://wa.me/${selectedStudent.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-yearbook-brown/70 hover:text-yearbook-brown"
                  >
                    <MessageCircle className="w-5 h-5 text-yearbook-brown" />
                    <span>+{selectedStudent.whatsapp}</span>
                  </a>
                </div>
                
                <button
                  onClick={resetAndClose}
                  className="mt-6 px-4 py-2 bg-yearbook-gold text-white rounded-full w-full"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </YearbookLayout>
    </PageTransition>
  );
};

export default Members;
