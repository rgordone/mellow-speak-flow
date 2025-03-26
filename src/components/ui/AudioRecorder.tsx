
import React, { useState, useRef, useEffect } from "react";
import { Mic, Square, Play, RotateCcw } from "lucide-react";

interface AudioRecorderProps {
  onAudioSaved: (audioBlob: Blob) => void;
  maxDuration?: number; // in seconds
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({ 
  onAudioSaved, 
  maxDuration = 40 
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingComplete, setRecordingComplete] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const timerIntervalRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Timer effect
  useEffect(() => {
    if (isRecording) {
      timerIntervalRef.current = window.setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer >= maxDuration) {
            stopRecording();
            return maxDuration;
          }
          return prevTimer + 1;
        });
      }, 1000);
    } else if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [isRecording, maxDuration]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  // Handle audio playback state
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onended = () => setIsPlaying(false);
    }
  }, [audioUrl]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        setRecordingComplete(true);
        setIsRecording(false);
        onAudioSaved(audioBlob);
        
        // Create audio element
        const audio = new Audio(url);
        audioRef.current = audio;
        
        // Stop all tracks
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
        }
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      setTimer(0);
      setRecordingComplete(false);
      
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
  };

  const playAudio = () => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const resetRecording = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    
    setAudioUrl(null);
    setRecordingComplete(false);
    setTimer(0);
    setIsPlaying(false);
    
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="rounded-2xl glassmorphism p-4 flex flex-col items-center">
      <div className="flex justify-center items-center w-full mb-3">
        <div className="text-lg font-medium">{formatTime(timer)}</div>
        <div className="text-xs text-muted-foreground ml-1">/ {formatTime(maxDuration)}</div>
      </div>
      
      <div className="flex gap-4 items-center justify-center">
        {!recordingComplete ? (
          <>
            {!isRecording ? (
              <button
                onClick={startRecording}
                className="h-12 w-12 flex items-center justify-center bg-primary text-white rounded-full shadow-md hover:brightness-110 transition-all"
              >
                <Mic size={20} />
              </button>
            ) : (
              <button
                onClick={stopRecording}
                className="h-12 w-12 flex items-center justify-center bg-destructive text-white rounded-full shadow-md hover:brightness-110 transition-all"
              >
                <Square size={18} />
              </button>
            )}
          </>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={playAudio}
              className={`h-12 w-12 flex items-center justify-center rounded-full shadow-md hover:brightness-105 transition-all ${isPlaying ? 'bg-muted text-muted-foreground' : 'bg-secondary text-secondary-foreground'}`}
              disabled={isPlaying}
            >
              <Play size={20} className={isPlaying ? 'rotate-record' : ''} />
            </button>
            
            <button
              onClick={resetRecording}
              className="h-12 w-12 flex items-center justify-center bg-muted text-muted-foreground rounded-full shadow-md hover:brightness-110 transition-all"
            >
              <RotateCcw size={18} />
            </button>
          </div>
        )}
      </div>
      
      {isRecording && (
        <div className="mt-3">
          <div className="h-2 w-40 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary animate-pulse" 
              style={{ width: `${(timer / maxDuration) * 100}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
