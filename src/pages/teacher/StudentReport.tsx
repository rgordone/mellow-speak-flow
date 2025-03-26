
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, Play, Save, Volume2 } from "lucide-react";
import TeacherLayout from "@/components/layout/TeacherLayout";

interface QuestionAnswer {
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

const StudentReport = () => {
  const { assignmentId, studentId } = useParams();
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  
  // Mock data
  const studentName = "Emma Thompson";
  const assignmentTitle = "Hometown";
  const submissionDate = "July 10, 2023";
  
  const questionAnswers: QuestionAnswer[] = [
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
    <TeacherLayout title={`Student Report: ${studentName}`}>
      <div className="mb-6">
        <Link 
          to={`/teacher/assignments/${assignmentId}`} 
          className="inline-flex items-center text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft size={16} className="mr-1" />
          Back to Submissions
        </Link>
      </div>
      
      <div className="card p-6 mb-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start">
          <div>
            <h3 className="text-lg font-medium mb-2">Assignment: {assignmentTitle}</h3>
            <p className="text-muted-foreground">Submitted: {submissionDate}</p>
          </div>
          <button className="btn-primary mt-4 md:mt-0 inline-flex items-center">
            <Save size={18} className="mr-2" />
            Save Feedback
          </button>
        </div>
      </div>
      
      <div className="space-y-6">
        {questionAnswers.map((qa, index) => (
          <div key={qa.id} className="card p-6">
            <div className="mb-4">
              <div className="flex items-start gap-3">
                <div className="bg-secondary text-secondary-foreground rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-1">
                  {index + 1}
                </div>
                <h3 className="text-lg">{qa.question}</h3>
              </div>
            </div>
            
            <div className="bg-secondary/50 rounded-lg p-4 mb-5">
              <button 
                className="flex items-center text-foreground hover:text-primary"
                onClick={() => playAudio(qa.id, qa.audioUrl)}
              >
                {isPlaying === qa.id ? (
                  <Volume2 size={20} className="mr-2 animate-pulse" />
                ) : (
                  <Play size={20} className="mr-2" />
                )}
                <span>{isPlaying === qa.id ? "Playing..." : "Play Recording"}</span>
              </button>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Feedback</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center mb-1">
                    <div className="w-24 font-medium">Grammar</div>
                    <div className="flex-1">
                      <input 
                        type="text" 
                        className="input-field w-full" 
                        value={qa.feedback.grammar}
                        onChange={() => {}}
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center mb-1">
                    <div className="w-24 font-medium">Pronunciation</div>
                    <div className="flex-1">
                      <input 
                        type="text" 
                        className="input-field w-full" 
                        value={qa.feedback.pronunciation}
                        onChange={() => {}}
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center mb-1">
                    <div className="w-24 font-medium">Fluency</div>
                    <div className="flex-1">
                      <input 
                        type="text" 
                        className="input-field w-full" 
                        value={qa.feedback.fluency}
                        onChange={() => {}}
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center mb-1">
                    <div className="w-24 font-medium">Coherence</div>
                    <div className="flex-1">
                      <input 
                        type="text" 
                        className="input-field w-full" 
                        value={qa.feedback.coherence}
                        onChange={() => {}}
                      />
                    </div>
                  </div>
                </div>
                
                {qa.feedback.vocabulary && (
                  <div>
                    <div className="flex items-center mb-1">
                      <div className="w-24 font-medium">Vocabulary</div>
                      <div className="flex-1">
                        <input 
                          type="text" 
                          className="input-field w-full" 
                          value={qa.feedback.vocabulary}
                          onChange={() => {}}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </TeacherLayout>
  );
};

export default StudentReport;
