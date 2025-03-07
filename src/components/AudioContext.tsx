"use client";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useLocation } from "react-router-dom";

interface AudioContextProps {
  isPlaying: boolean;
  togglePlayback: () => void;
  currentMusic: string;
}

const AudioContext = createContext<AudioContextProps | undefined>(undefined);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};

const routeMusicMap: Record<string, string> = {
  "/": "/music.mp3",
  "/members": "/music.mp3",
  "/messages": "/music.mp3",
  "/memories": "/music.mp3",
  "/hangman": "/music.mp3",
};

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true); // Default to playing
  const location = useLocation();
  const [currentMusic, setCurrentMusic] = useState<string>("/music.mp3");

  useEffect(() => {
    const musicForRoute = routeMusicMap[location.pathname] || "/music.mp3";
    setCurrentMusic(musicForRoute);

    if (!audioRef.current) {
      audioRef.current = new Audio(musicForRoute);
      audioRef.current.loop = true;
    } else if (audioRef.current.src !== new URL(musicForRoute, window.location.href).href) {
      const wasPlaying = !audioRef.current.paused;
      audioRef.current.pause();
      audioRef.current.src = musicForRoute;
      
      if (wasPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log("Audio play error:", error);
            setIsPlaying(false);
          });
        }
      }
    }

    if (isPlaying && audioRef.current) {
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Audio autoplay prevented:", error);
          setIsPlaying(false);
        });
      }
    }

    return () => {
    };
  }, [location.pathname]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch((error) => {
          console.log("Audio play error:", error);
        });
        setIsPlaying(true);
      }
    }
  };

  return (
    <AudioContext.Provider value={{ isPlaying, togglePlayback, currentMusic }}>
      {children}
      <div className="fixed bottom-20 right-6 z-40">
        <button
          onClick={togglePlayback}
          className="p-3 rounded-full bg-yearbook-brown text-white shadow-md hover:bg-yearbook-brown/90"
          aria-label={isPlaying ? "Mute audio" : "Unmute audio"}
        >
          {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>
      </div>
    </AudioContext.Provider>
  );
};
