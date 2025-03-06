
import { useState } from "react";
import PageTransition from "../components/PageTransition";
import YearbookLayout from "../components/YearbookLayout";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Instagram, MessageCircle } from "lucide-react";
import AudioPlayer from "../components/AudioPlayer";

// Teacher data
const teacher = {
  id: 0,
  name: "Meiria Jolina Tarigan, M.Pd",
  photos: [
    "/Meiria.JPG&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  ],
  quote: "\"Education is not the filling of a pail, but the lighting of a fire.\"",
  instagram: "meiria_jolina_tarigan",
  whatsapp: "6285236605347"
};

// Individual student data with unique information
const students = [
  {
    id: 1,
    name: "Cecillia Therine",
    photos: [
      "/Cecillia.JPG",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1504257432389-52343af06ae3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ],
    quote: "\"Lorem ipsum dolor sit amet\"",
    instagram: "cecillia",
    whatsapp: "628123456789"
  },
  {
    id: 2,
    name: "Celine Su",
    photos: [
      "/Celine.JPG",
      "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ],
    quote: "\"Lorem ipsum dolor sit amet\"",
    instagram: "celine",
    whatsapp: "628123456789"
  },
  {
    id: 3,
    name: "Eileen Halona",
    photos: [
      "/Eileen.JPG",
      "https://images.unsplash.com/photo-1492288991661-058aa541ff43?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1507038732509-8b1a9623223a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ],
    quote: "\"Lorem ipsum dolor sit amet\"",
    instagram: "eileen",
    whatsapp: "6281234567803"
  },
  {
    id: 4,
    name: "Estherrina Daisuly Lumban Tobing",
    photos: [
      "/Esther.JPG",
      "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1505033575518-a36ea2ef75ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ],
    quote: "\"DLorem ipsum dolor sit amet\"",
    instagram: "esther",
    whatsapp: "6281234567804"
  },
  {
    id: 5,
    name: "Jolin Grace Djauhari",
    photos: [
      "/Jolin.JPG",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1520341280432-4749d4d7bcf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ],
    quote: "\"Lorem ipsum dolor sit amet\"",
    instagram: "jolin",
    whatsapp: "6281234567805"
  },
  {
    id: 6,
    name: "Jolleane Princessa Laurent",
    photos: [
      "/Jolleane.JPG",
      "https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1513379733131-47fc74b45fc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ],
    quote: "\"Lorem ipsum dolor sit amet\"",
    instagram: "jolleane",
    whatsapp: "6281234567806"
  },
  // Add more students with unique data for a total of 36
  // (I'll add a few more examples, but in a real implementation you would add all 36)
  {
    id: 7,
    name: "Jollyn Elicia Candra",
    photos: [
      "/Jollyn.JPG",
      "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ],
    quote: "\"Lorem ipsum dolor sit amet\"",
    instagram: "jollyn",
    whatsapp: "6281234567807"
  },
  {
    id: 8,
    name: "Kayleen Noviten",
    photos: [
      "/Kayleen.JPG",
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ],
    quote: "\"Lorem ipsum dolor sit amet\"",
    instagram: "kayleen",
    whatsapp: "6281234567808"
  },
  {
    id: 9,
    name: "Keisha Meilya Putri Br. Sitepu",
    photos: [
      "/Keisha.JPG",
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ],
    quote: "\"Lorem ipsum dolor sit amet\"",
    instagram: "keisha",
    whatsapp: "6281234567808"
  },
  {
    id: 10,
    name: "Miranda Kezia Agatha Rajagukguk",
    photos: [
      "/Miranda.JPG",
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ],
    quote: "\"Lorem ipsum dolor sit amet\"",
    instagram: "miranda",
    whatsapp: "6281234567808"
  },
  {
    id: 11,
    name: "Nathania Delphinne Felim",
    photos: [
      "/Nathania.JPG",
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ],
    quote: "\"Lorem ipsum dolor sit amet\"",
    instagram: "nathania",
    whatsapp: "6281234567808"
  },
  {
    id: 12,
    name: "Ririn Ria Asnila Saragih",
    photos: [
      "/Ririn.JPG",
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ],
    quote: "\"Lorem ipsum dolor sit amet\"",
    instagram: "ririn",
    whatsapp: "6281234567808"
  },
  {
    id: 13,
    name: "Sandra Micelle Imanuella Parapat",
    photos: [
      "/Sandra.JPG",
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ],
    quote: "\"Lorem ipsum dolor sit amet\"",
    instagram: "sandra",
    whatsapp: "6281234567808"
  },
  {
    id: 14,
    name: "Vallerine Angelica Kuok",
    photos: [
      "/Vallerine.JPG",
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ],
    quote: "\"Lorem ipsum dolor sit amet\"",
    instagram: "vallerine",
    whatsapp: "6281234567808"
  },
  {
    id: 15,
    name: "Victoria Rickie",
    photos: [
      "/Victoria.JPG",
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ],
    quote: "\"Lorem ipsum dolor sit amet\"",
    instagram: "victoria",
    whatsapp: "6281234567808"
  },
  {
    id: 16,
    name: "Winda Tresia Br. Panjaitan",
    photos: [
      "/Winda.JPG",
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ],
    quote: "\"Lorem ipsum dolor sit amet\"",
    instagram: "winda",
    whatsapp: "6281234567808"
  },
  {
    id: 17,
    name: "Chrestellyo Surya Wijaya",
    photos: [
      "/Chrestellyo.JPG",
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ],
    quote: "\"Lorem ipsum dolor sit amet\"",
    instagram: "chrestellyo",
    whatsapp: "6281234567808"
  },
  {
    id: 18,
    name: "Gavin Thedrico",
    photos: [
      "/Gavin.JPG",
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ],
    quote: "\"Lorem ipsum dolor sit amet\"",
    instagram: "gavin",
    whatsapp: "6281234567808"
  },
  {
    id: 19,
    name: "Giovello",
    photos: [
      "/Giovello.JPG",
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ],
    quote: "\"Lorem ipsum dolor sit amet\"",
    instagram: "giovello",
    whatsapp: "6281234567808"
  },
  {
    id: 20,
    name: "Jefferson Tandy",
    photos: [
      "/Jefferson.JPG",
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ],
    quote: "\"Lorem ipsum dolor sit amet\"",
    instagram: "jefferson",
    whatsapp: "6281234567808"
  },
  {
    id: 21,
    name: "Joshua Michael Isakhar Simanungkalit",
    photos: [
      "/Joshua.JPG",
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ],
    quote: "\"Lorem ipsum dolor sit amet\"",
    instagram: "joshua",
    whatsapp: "6281234567808"
  },
  {
    id: 22,
    name: "Jovan Ricardo",
    photos: [
      "/Jovan.JPG",
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ],
    quote: "\"Lorem ipsum dolor sit amet\"",
    instagram: "jovan",
    whatsapp: "6281234567808"
  },
  {
    id: 23,
    name: "Kristian Minoto Cuang",
    photos: [
      "/Kristian.JPG",
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ],
    quote: "\"Lorem ipsum dolor sit amet\"",
    instagram: "kristian",
    whatsapp: "6281234567808"
  },
  {
    id: 24,
    name: "Manuel Otto Chandra",
    photos: [
      "/Manuel.JPG",
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ],
    quote: "\"Lorem ipsum dolor sit amet\"",
    instagram: "manuel",
    whatsapp: "6281234567808"
  },
  {
    id: 25,
    name: "Moses Dominggus Simamora",
    photos: [
      "/Moses.JPG",
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ],
    quote: "\"Jago coding website tak menjaminmu masuk STEI-K ITB\"",
    instagram: "mosesds_",
    whatsapp: "6282318367353"
  },
  {
    id: 26,
    name: "Nathanael Sebastian Hutabalian Sagala",
    photos: [
      "/Nathanael.JPG",
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ],
    quote: "\"Lorem ipsum dolor sit amet\"",
    instagram: "nathanael",
    whatsapp: "6281234567808"
  },
  {
    id: 27,
    name: "Nick James Chadwick Panjaitan",
    photos: [
      "/Nick.JPG",
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ],
    quote: "\"Lorem ipsum dolor sit amet\"",
    instagram: "nickjames",
    whatsapp: "6281234567808"
  },
  {
    id: 28,
    name: "Okto Christian Fang",
    photos: [
      "/Okto.JPG",
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ],
    quote: "\"Lorem ipsum dolor sit amet\"",
    instagram: "kayleen",
    whatsapp: "6281234567808"
  },
  {
    id: 29,
    name: "Raymond Zebua",
    photos: [
      "/Raymond.JPG",
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ],
    quote: "\"Lorem ipsum dolor sit amet\"",
    instagram: "raymondzebua",
    whatsapp: "6281234567808"
  },
  {
    id: 30,
    name: "Raywen Tayrin",
    photos: [
      "/Raywen.JPG",
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ],
    quote: "\"Lorem ipsum dolor sit amet\"",
    instagram: "raywen",
    whatsapp: "6281234567808"
  },
  {
    id: 31,
    name: "Rio Fernaldy",
    photos: [
      "/Rio.JPG",
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ],
    quote: "\"Lorem ipsum dolor sit amet\"",
    instagram: "rio",
    whatsapp: "6281234567808"
  },
  {
    id: 32,
    name: "Rowlly Santiono",
    photos: [
      "/Rowlly.JPG",
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ],
    quote: "\"Lorem ipsum dolor sit amet\"",
    instagram: "rowlly",
    whatsapp: "6281234567808"
  },
  {
    id: 33,
    name: "Tobias Situmorang",
    photos: [
      "/Tobias.JPG",
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ],
    quote: "\"Lorem ipsum dolor sit amet\"",
    instagram: "tobiassitumorang",
    whatsapp: "6281234567808"
  },
  {
    id: 34,
    name: "Wilbert Launata",
    photos: [
      "/Wilbert.JPG",
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ],
    quote: "\"Lorem ipsum dolor sit amet\"",
    instagram: "wilbert",
    whatsapp: "6281234567808"
  },
  {
    id: 35,
    name: "Wilson Khosasi",
    photos: [
      "/Wilson.JPG",
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ],
    quote: "\"Lorem ipsum dolor sit amet\"",
    instagram: "wilson",
    whatsapp: "6281234567808"
  },
  // Continue with the remaining students...
  // For brevity, I'll complete with placeholder data, in a real implementation
  // you would want unique data for all 36 students
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
  const [selectedStudent, setSelectedStudent] = useState<(typeof students[0] | typeof teacher) | null>(null);
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
        
        <div className="py-4">
          {/* Teacher Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-center text-yearbook-brown mb-4">Our Lovely Teacher</h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-3xl mx-auto"
              onClick={() => setSelectedStudent(teacher)}
            >
              <div className="aspect-[4/3] overflow-hidden bg-yearbook-gold/10 rounded-lg">
                <img
                  src={teacher.photos[0]}
                  alt={teacher.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-3 bg-yearbook-gold/5 text-center">
                <h3 className="font-medium text-lg text-yearbook-brown">{teacher.name}</h3>
                <p className="text-yearbook-brown/70 text-sm">@{teacher.instagram}</p>
              </div>
            </motion.div>
          </div>
          
          {/* Students Section */}
          <h2 className="text-2xl font-bold text-center text-yearbook-brown mb-6">We Miu Members</h2>
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
