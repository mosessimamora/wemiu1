
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PageTransition from "../components/PageTransition";
import YearbookLayout from "../components/YearbookLayout";
import { motion, AnimatePresence } from "framer-motion";

// Sample message data (placeholder)
const messageData = [
  {
    id: 1,
    sender: "Kepala Sekolah",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    message: "Selamat atas kelulusan kalian! Perjalanan hidup yang sebenarnya baru dimulai. Jadilah pribadi yang bermanfaat dan selalu menebar kebaikan di mana pun kalian berada."
  },
  {
    id: 2,
    sender: "Wali Kelas",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    message: "Saya sangat bangga dengan prestasi yang telah kalian capai. Tetaplah belajar dan berkembang, karena hidup adalah pembelajaran yang tak pernah berhenti."
  },
  {
    id: 3,
    sender: "Guru Matematika",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    message: "Seperti rumus matematika, hidup juga memiliki pola. Temukan pola kalian sendiri dan pecahkan masalah dengan bijak. Selamat menempuh kehidupan baru!"
  },
  {
    id: 4,
    sender: "Guru Bahasa Indonesia",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    message: "Tulislah cerita hidup kalian dengan pena keyakinan dan tinta keberanian. Buat narasi yang bermakna dan menginspirasi banyak orang."
  },
  {
    id: 5,
    sender: "Guru Biologi",
    photo: "https://images.unsplash.com/photo-1569913486515-b74bf7751574?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    message: "Hidup seperti ekosistem, saling terhubung dan mempengaruhi. Jadilah organisme yang memberikan manfaat bagi lingkungan sekitar."
  },
  {
    id: 6,
    sender: "Guru Fisika",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    message: "Ingat hukum kekekalan energi, energi tidak dapat diciptakan atau dimusnahkan, hanya berubah bentuk. Ubah energi kalian menjadi sesuatu yang positif dan bermanfaat."
  },
  {
    id: 7,
    sender: "Guru Kimia",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    message: "Seperti reaksi kimia, pertemuan dengan berbagai orang akan membentuk 'senyawa' baru dalam hidup kalian. Pilih 'reaksi' yang tepat untuk menghasilkan 'senyawa' terbaik."
  },
  {
    id: 8,
    sender: "Guru Sejarah",
    photo: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    message: "Kalian telah menyelesaikan satu bab sejarah hidup. Kini saatnya menulis bab baru. Jadikan masa lalu sebagai pelajaran untuk meraih masa depan yang lebih baik."
  },
  {
    id: 9,
    sender: "Guru Seni",
    photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    message: "Hidup adalah kanvas kosong, dan kalian adalah pelukisnya. Beranilah memberi warna-warni berani pada lukisan hidup kalian. Jadikan hidup sebagai karya seni terbaik."
  },
  {
    id: 10,
    sender: "Guru Olahraga",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    message: "Seperti atlet yang pantang menyerah, hadapi tantangan hidup dengan semangat juang tinggi. Berkeringatlah untuk mimpi kalian dan raih kemenangan dalam permainan kehidupan!"
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

  return (
    <PageTransition>
      <YearbookLayout title="Messages">
        <div className="flex flex-col items-center justify-center min-h-[70vh] relative px-4">
          {/* Page indicator */}
          <div className="absolute top-0 left-0 right-0 flex justify-center gap-1 mb-6 py-4">
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
          
          {/* Message content */}
          <div className="w-full max-w-2xl mx-auto relative mt-12">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={currentPage}
                custom={direction}
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={pageTransition}
                className="flex flex-col items-center p-6"
              >
                <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-yearbook-gold shadow-lg">
                  <img 
                    src={currentMessage.photo} 
                    alt={currentMessage.sender} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <h2 className="text-2xl font-semibold text-yearbook-brown mb-4">
                  {currentMessage.sender}
                </h2>
                
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md mb-8">
                  <p className="text-yearbook-brown text-lg leading-relaxed">
                    "{currentMessage.message}"
                  </p>
                </div>
                
                <div className="text-sm text-yearbook-brown/60">
                  {currentPage + 1} of {messageData.length}
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Navigation buttons */}
            <div className="absolute top-1/2 left-0 right-0 flex justify-between -translate-y-1/2 pointer-events-none">
              <button 
                onClick={prevMessage}
                disabled={currentPage === 0}
                className={`p-3 rounded-full bg-yearbook-brown/10 text-yearbook-brown pointer-events-auto ${
                  currentPage === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-100 cursor-pointer hover:bg-yearbook-brown/20'
                }`}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button 
                onClick={nextMessage}
                disabled={currentPage === messageData.length - 1}
                className={`p-3 rounded-full bg-yearbook-brown/10 text-yearbook-brown pointer-events-auto ${
                  currentPage === messageData.length - 1 ? 'opacity-30 cursor-not-allowed' : 'opacity-100 cursor-pointer hover:bg-yearbook-brown/20'
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
