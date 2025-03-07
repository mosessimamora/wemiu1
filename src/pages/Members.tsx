
import { useState } from "react";
import PageTransition from "../components/PageTransition";
import YearbookLayout from "../components/YearbookLayout";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Instagram, MessageCircle, ArrowLeft } from "lucide-react";
import AudioPlayer from "../components/AudioPlayer";
import { Link } from "react-router-dom";

// Teacher data
const teacher = {
  id: 0,
  name: "Meiria Jolina Tarigan, M.Pd",
  photos: [
    "/Meiria.jpg",
    "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  ],
  birthDate: "01 January 1980",
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
      "/Cecillia.jpg",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1504257432389-52343af06ae3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    ],
    birthDate: "15 March 2006",
    quote: "\"Lorem ipsum dolor sit amet\"",
    instagram: "cecillia",
    whatsapp: "628123456789"
  },
  {
    id: 2,
    name: "Celine Su",
    photos: [
      "/Celine.jpg",
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
      "/Eileen.jpg",
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
      "/Esther.jpg",
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
      "/Jolin.jpg",
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
      "/Jolleane.jpg",
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
    name: "Jolynn Elicia Chandra",
    photos: [
      "/Jolynn.jpg",
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
      "/Kayleen.jpg",
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
      "/Keisha.jpg",
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
      "/Miranda.jpg",
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
      "/Nathania.jpg",
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
      "/Ririn.jpg",
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
      "/Sandra.jpg",
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
      "/Vallerine.jpg",
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
      "/Victoria.jpg",
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
      "/Winda.jpg",
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
      "/Chrestellyo.jpg",
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
      "/Gavin.jpg",
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
      "/Giovello.jpg",
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
      "/Jefferson.jpg",
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
      "/Joshua.jpg",
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
      "/Jovan.jpg",
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
      "/Kristian.jpg",
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
      "/Manuel.jpg",
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
      "/Moses.jpg",
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
      "/Nathanael.jpg",
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
      "/Nick.jpg",
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
      "/Okto.jpg",
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
      "/Raymond.jpg",
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
      "/Raywen.jpg",
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
      "/Rio.jpg",
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
      "/Rowlly.jpg",
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
      "/Tobias.jpg",
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
      "/Wilbert.jpg",
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
      "/Wilson.jpg",
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
    transition: { duration: 0.4 }
  }
};

const Members = () => {
  const [showTeacher, setShowTeacher] = useState(true);
  
  return (
    <PageTransition>
      <YearbookLayout title="Wemiu Class">
        {/* Audio Player for this page */}
        <AudioPlayer audioSrc="/music.mp3" />
        
        <div className="pb-20">
          {/* Toggle buttons */}
          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={() => setShowTeacher(true)}
              className={`px-6 py-2 rounded-full ${
                showTeacher 
                  ? "bg-yearbook-gold text-white" 
                  : "bg-yearbook-gold/20 text-yearbook-brown"
              }`}
            >
              Teacher
            </button>
            <button
              onClick={() => setShowTeacher(false)}
              className={`px-6 py-2 rounded-full ${
                !showTeacher 
                  ? "bg-yearbook-gold text-white" 
                  : "bg-yearbook-gold/20 text-yearbook-brown"
              }`}
            >
              Students
            </button>
          </div>
          
          {/* Teacher section */}
          {showTeacher ? (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="max-w-md mx-auto"
            >
              <motion.div
                variants={itemVariants}
                className="bg-white rounded-xl shadow-lg overflow-hidden mb-8"
              >
                <div className="relative">
                  <img 
                    src={teacher.photos[0]} 
                    alt={teacher.name}
                    className="w-full h-auto object-cover"
                  />
                </div>
                
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-yearbook-brown mb-2">{teacher.name}</h2>
                  
                  <p className="text-yearbook-brown/80 mb-4">{teacher.quote}</p>
                  
                  <div className="flex justify-center space-x-4">
                    <a 
                      href={`https://instagram.com/${teacher.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-yearbook-gold/10 text-yearbook-brown hover:bg-yearbook-gold/20"
                    >
                      <Instagram size={20} />
                    </a>
                    <a 
                      href={`https://wa.me/${teacher.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-yearbook-gold/10 text-yearbook-brown hover:bg-yearbook-gold/20"
                    >
                      <MessageCircle size={20} />
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            /* Students grid */
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="grid grid-cols-2 md:grid-cols-3 gap-4 px-4"
            >
              {students.map((student) => (
                <motion.div
                  key={student.id}
                  variants={itemVariants}
                  className="bg-white rounded-lg shadow overflow-hidden"
                >
                  <div className="relative w-full pt-[100%]">
                    <img 
                      src={student.photos[0]} 
                      alt={student.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="p-3">
                    <h3 className="text-sm font-medium text-yearbook-brown truncate">
                      {student.name}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </YearbookLayout>
    </PageTransition>
  );
};

export default Members;
