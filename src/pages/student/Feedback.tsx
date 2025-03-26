
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Play, Volume2 } from "lucide-react";
import StudentLayout from "@/components/layout/StudentLayout";

interface QuestionFeedback {
  id: string;
  question: string;
  audioUrl: string;
  feedback: {
    grammar: string;
    pronunciation: string;
    fluency: string;
    coherence: string;
    vocabulary?: string;
  };
}

const Feedback = () => {
  const { assignmentId } = useParams();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  
  // Mock data
  const assignmentTitle = "Hometown";
  
  const questionFeedback: QuestionFeedback[] = [
    {
      id: "1",
      question: "Tell me about where you live. What do you like about living there?",
      audioUrl: "https://example.com/audio1.mp3", // Replace with actual URL
      feedback: {
        grammar: "Good use of present tense, but be careful with prepositions.",
        pronunciation: "Clear pronunciation of most words. Work on the 'th' sound.",
        fluency: "Good pace, minimal hesitation. Try to reduce filler words like 'um'.",
        coherence: "Well-structured response with good use of linking words.",
        vocabulary: "Good use of descriptive vocabulary for neighborhood features."
      }
    },
    {
      id: "2",
      question: "Is there anything you don't like about your hometown?",
      audioUrl: "https://example.com/audio2.mp3", // Replace with actual URL
      feedback: {
        grammar: "Some errors with negative forms. Review 'don't' vs 'doesn't'.",
        pronunciation: "Good intonation but work on stressed syllables.",
        fluency: "Some hesitation when discussing complex issues.",
        coherence: "Good organization of ideas with clear examples."
      }
    },
    {
      id: "3",
      question: "Do you think your hometown is a good place for tourists to visit?",
      audioUrl: "https://example.com/audio3.mp3", // Replace with actual URL
      feedback: {
        grammar: "Good use of conditionals and modal verbs.",
        pronunciation: "Clear articulation of most sounds.",
        fluency: "Natural pace and rhythm, good response time.",
        coherence: "Well-developed response with logical progression of ideas."
      }
    }
  ];
  
  const playAudio = (id: string, url: string) => {
    if (currentAudio) {
      currentAudio.pause();
      if (isPlaying === id) {
        setIsPlaying(null);
        return;
      }
    }
    
    // Since we don't have real audio files, we'll simulate audio playback
    const audio = new Audio(url);
    audio.onended = () => setIsPlaying(null);
    setCurrentAudio(audio);
    setIsPlaying(id);
    
    // In a real implementation, you would do:
    // audio.play();
    
    // For our demo, we'll simulate the audio ending after 3 seconds
    setTimeout(() => {
      setIsPlaying(null);
    }, 3000);
  };

  return (
    <StudentLayout title={`Feedback: ${assignmentTitle}`}>
      <div className="mb-6">
        <button 
          onClick={() => navigate('/student/dashboard')}
          className="inline-flex items-center text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft size={16} className="mr-1" />
          Back to Dashboard
        </button>
      </div>
      
      <div className="space-y-6">
        {questionFeedback.map((qf, index) => (
          <div key={qf.id} className="card p-5">
            <div className="mb-4">
              <div className="flex items-start gap-3">
                <div className="bg-secondary text-secondary-foreground rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-1">
                  {index + 1}
                </div>
                <h3 className="text-base md:text-lg">{qf.question}</h3>
              </div>
            </div>
            
            <div className="bg-secondary/50 rounded-lg p-3 mb-4">
              <button 
                className="flex items-center text-foreground hover:text-primary"
                onClick={() => playAudio(qf.id, qf.audioUrl)}
              >
                {isPlaying === qf.id ? (
                  <Volume2 size={18} className="mr-2 animate-pulse" />
                ) : (
                  <Play size={18} className="mr-2" />
                )}
                <span className="text-sm">{isPlaying === qf.id ? "Playing..." : "Play Your Recording"}</span>
              </button>
            </div>
            
            <div>
              <h4 className="font-medium mb-3 text-sm">Teacher's Feedback</h4>
              <div className="space-y-3">
                <div className="pb-2 border-b border-border">
                  <div className="text-xs text-muted-foreground mb-1">Grammar</div>
                  <div className="text-sm">{qf.feedback.grammar}</div>
                </div>
                
                <div className="pb-2 border-b border-border">
                  <div className="text-xs text-muted-foreground mb-1">Pronunciation</div>
                  <div className="text-sm">{qf.feedback.pronunciation}</div>
                </div>
                
                <div className="pb-2 border-b border-border">
                  <div className="text-xs text-muted-foreground mb-1">Fluency</div>
                  <div className="text-sm">{qf.feedback.fluency}</div>
                </div>
                
                <div className="pb-2 border-b border-border">
                  <div className="text-xs text-muted-foreground mb-1">Coherence</div>
                  <div className="text-sm">{qf.feedback.coherence}</div>
                </div>
                
                {qf.feedback.vocabulary && (
                  <div className="pb-2">
                    <div className="text-xs text-muted-foreground mb-1">Vocabulary</div>
                    <div className="text-sm">{qf.feedback.vocabulary}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </StudentLayout>
  );
};

export default Feedback;
