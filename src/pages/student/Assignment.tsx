
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import StudentLayout from "@/components/layout/StudentLayout";
import AudioRecorder from "@/components/ui/AudioRecorder";

interface Question {
  id: string;
  text: string;
}

const Assignment = () => {
  const { assignmentId } = useParams();
  const navigate = useNavigate();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [recordedAudios, setRecordedAudios] = useState<Record<string, Blob>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Mock data
  const assignmentTitle = "Hometown";
  const questions: Question[] = [
    {
      id: "q1",
      text: "Tell me about where you live. What do you like about living there?"
    },
    {
      id: "q2",
      text: "Is there anything you don't like about your hometown?"
    },
    {
      id: "q3",
      text: "Do you think your hometown is a good place for tourists to visit?"
    }
  ];

  const currentQuestion = questions[currentQuestionIndex];
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleNext = () => {
    if (!isLastQuestion) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // If all questions have recordings, proceed to submit
      const allRecorded = questions.every(q => recordedAudios[q.id]);
      if (allRecorded) {
        setIsSubmitting(true);
      } else {
        alert("Please record an answer for all questions before submitting.");
      }
    }
  };

  const handlePrevious = () => {
    if (!isFirstQuestion) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleAudioSaved = (audioBlob: Blob) => {
    setRecordedAudios({
      ...recordedAudios,
      [currentQuestion.id]: audioBlob
    });
  };

  const handleSubmit = () => {
    // In a real app, this would upload the audio files to a server
    console.log("Submitting assignment...");
    
    // Simulate submission delay
    setTimeout(() => {
      navigate(`/student/feedback/${assignmentId}`);
    }, 1500);
  };

  const areAllQuestionsAnswered = questions.every(q => recordedAudios[q.id]);

  if (isSubmitting) {
    return (
      <StudentLayout title="Submit Assignment" hideNav>
        <div className="text-center py-10 animate-fade-in">
          <h3 className="text-xl font-medium mb-6">Submit your assignment?</h3>
          <p className="text-muted-foreground mb-8">
            You've recorded answers for all {questions.length} questions.
            Once submitted, you won't be able to change your answers.
          </p>
          
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => setIsSubmitting(false)}
              className="btn-secondary"
            >
              Go Back
            </button>
            
            <button 
              onClick={handleSubmit}
              className="btn-primary"
            >
              Submit Assignment
            </button>
          </div>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout title={`Assignment: ${assignmentTitle}`} hideNav>
      <div className="mb-6">
        <button 
          onClick={() => navigate('/student/dashboard')}
          className="inline-flex items-center text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft size={16} className="mr-1" />
          Back to Dashboard
        </button>
      </div>
      
      <div className="max-w-xl mx-auto">
        <div className="mb-6 flex justify-center">
          <div className="bg-muted rounded-full px-4 py-2 text-sm">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
        </div>
        
        <div className="card p-6 mb-8 animate-fade-in">
          <h3 className="text-lg mb-6">{currentQuestion.text}</h3>
          
          <AudioRecorder 
            onAudioSaved={handleAudioSaved}
            maxDuration={40} // 40 seconds for IELTS Part 1
          />
        </div>
        
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={isFirstQuestion}
            className={`btn-secondary inline-flex items-center ${isFirstQuestion ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <ChevronLeft size={18} className="mr-1" />
            Previous
          </button>
          
          <button
            onClick={handleNext}
            className="btn-primary inline-flex items-center"
          >
            {isLastQuestion ? (
              <>
                {recordedAudios[currentQuestion.id] ? "Submit" : "Complete this question"}
              </>
            ) : (
              <>
                Next
                <ChevronRight size={18} className="ml-1" />
              </>
            )}
          </button>
        </div>
      </div>
    </StudentLayout>
  );
};

export default Assignment;
