
import { useState, useCallback } from "react";
import PageTransition from "../components/PageTransition";
import YearbookLayout from "../components/YearbookLayout";
import { motion, AnimatePresence } from "framer-motion";
import AudioPlayer from "../components/AudioPlayer";

// Sample memory categories and images (placeholder)
const memoryCategories = [
  {
    id: "school-events",
    title: "Kelas 11",
    description: "Foto foto kita waktu kelas 11",
    images: Array.from({ length: 6 }, (_, index) => ({
      id: `kelas11-${index + 1}`,
      url: `https://images.unsplash.com/photo-${1560000000000 + index * 10000}?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80`,
      description: `School event #${index + 1} - Wonderful moments we shared together.`
    }))
  },
  {
    id: "class-activities",
    title: "Kelas 12",
    description: "Foto Foto Kita waktu kelas 12",
    images: Array.from({ length: 6 }, (_, index) => ({
      id: `kelas12-${index + 1}`,
      url: `https://images.unsplash.com/photo-${1561000000000 + index * 10000}?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80`,
      description: `Class activity #${index + 1} - Learning together, growing together.`
    }))
  },
  {
    id: "field-trips",
    title: "Perpisahan",
    description: "Perpisahan di Samosir!",
    images: Array.from({ length: 6 }, (_, index) => ({
      id: `perpisahan-${index + 1}`,
      url: `https://images.unsplash.com/photo-${1562000000000 + index * 10000}?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80`,
      description: `Field trip #${index + 1} - Broadening our horizons and exploring new places.`
    }))
  },
  {
    id: "sports",
    title: "Natal",
    description: "Natal Sekolah!",
    images: Array.from({ length: 6 }, (_, index) => ({
      id: `natal-${index + 1}`,
      url: `https://images.unsplash.com/photo-${1563000000000 + index * 10000}?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80`,
      description: `Sports moment #${index + 1} - Building teamwork and pushing our limits.`
    }))
  }
];

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
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

const Memories = () => {
  const [selectedImage, setSelectedImage] = useState<any | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>(memoryCategories[0].id);

  // Memoize the category change handler to prevent re-renders
  const handleCategoryChange = useCallback((categoryId: string) => {
    setActiveCategory(categoryId);
  }, []);

  const currentCategory = memoryCategories.find(cat => cat.id === activeCategory);

  return (
    <PageTransition>
      <YearbookLayout title="Memories">
        {/* Background Music Player */}
        <AudioPlayer audioSrc="/lovable-uploads/memories-background.mp3" />
        
        <div className="py-4">
          {/* Category tabs - using button elements with proper event handling */}
          <div className="flex overflow-x-auto pb-2 mb-6 hide-scrollbar">
            <div className="flex space-x-2">
              {memoryCategories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  aria-pressed={activeCategory === category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`px-4 py-2 whitespace-nowrap rounded-full transition-all focus:outline-none ${
                    activeCategory === category.id 
                      ? 'bg-yearbook-gold text-white' 
                      : 'bg-yearbook-gold/10 text-yearbook-brown hover:bg-yearbook-gold/20'
                  }`}
                >
                  {category.title}
                </button>
              ))}
            </div>
          </div>
          
          {/* Category description */}
          {currentCategory && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-yearbook-brown">{currentCategory.title}</h2>
              <p className="text-yearbook-brown/70">{currentCategory.description}</p>
            </div>
          )}
          
          {/* Photo grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4"
              >
                {currentCategory?.images.map((image) => (
                  <motion.div
                    key={image.id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.03 }}
                    className="overflow-hidden rounded-lg shadow-md cursor-pointer"
                    onClick={() => setSelectedImage(image)}
                  >
                    <div className="aspect-square overflow-hidden bg-yearbook-gold/10">
                      <img
                        src={image.url}
                        alt={`Memory ${image.id}`}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Image Detail Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full rounded-xl overflow-hidden bg-yearbook-gold/10">
                <img
                  src={selectedImage.url}
                  alt={`Memory ${selectedImage.id}`}
                  className="w-full h-full object-contain max-h-[80vh]"
                />
              </div>
              <div className="p-4 text-white text-center">
                <p className="italic">{selectedImage.description}</p>
              </div>
            </motion.div>
          </div>
        )}
      </YearbookLayout>
    </PageTransition>
  );
};

export default Memories;
