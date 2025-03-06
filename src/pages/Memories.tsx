
import { useState } from "react";
import PageTransition from "../components/PageTransition";
import YearbookLayout from "../components/YearbookLayout";
import { motion } from "framer-motion";

// Sample image data (placeholder)
const memoryImages = Array.from({ length: 16 }, (_, index) => ({
  id: index + 1,
  url: `https://images.unsplash.com/photo-${1560000000000 + index * 10000}?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80`,
  description: `Memory #${index + 1} - Wonderful moments we shared together.`
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
  const [selectedImage, setSelectedImage] = useState<typeof memoryImages[0] | null>(null);

  return (
    <PageTransition>
      <YearbookLayout title="Memories">
        <div className="py-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4"
          >
            {memoryImages.map((image) => (
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
