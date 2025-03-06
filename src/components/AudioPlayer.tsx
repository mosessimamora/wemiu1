
import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface AudioPlayerProps {
  audioSrc: string;
  autoPlay?: boolean;
}

const AudioPlayer = ({ audioSrc, autoPlay = true }: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        // Use a promise and catch errors to handle autoplay restrictions
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // Autoplay started
            })
            .catch(error => {
              // Autoplay was prevented
              console.log("Autoplay prevented:", error);
              setIsPlaying(false);
            });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, audioSrc]);

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-20 right-6 z-40">
      <audio ref={audioRef} src={audioSrc} loop />
      <button 
        onClick={togglePlayback}
        className="p-3 rounded-full bg-yearbook-brown text-white shadow-md hover:bg-yearbook-brown/90"
      >
        {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>
    </div>
  );
};

export default AudioPlayer;
