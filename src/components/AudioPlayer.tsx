
import { useEffect } from "react";
import { useAudio } from "./AudioContext";

interface AudioPlayerProps {
  audioSrc: string;
}

const AudioPlayer = ({ audioSrc }: AudioPlayerProps) => {
  // This component doesn't render anything visible and uses the global audio context
  // It just helps us define different music for different pages
  
  // The actual audio handling is done by AudioContext
  // This component is just a placeholder that's compatible with the existing code
  
  return null;
};

export default AudioPlayer;
