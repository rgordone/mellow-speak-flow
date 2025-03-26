
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle, Trash2, Save } from "lucide-react";
import TeacherLayout from "@/components/layout/TeacherLayout";

const CreateAssignment = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [selectedClass, setSelectedClass] = useState("class1");
  const [questions, setQuestions] = useState([
    "Tell me about where you live. What do you like about living there?",
    "Is there anything you don't like about your hometown?",
    "Do you think your hometown is a good place for tourists to visit?",
  ]);

  const handleAddQuestion = () => {
    setQuestions([...questions, ""]);
  };

  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index] = value;
    setQuestions(newQuestions);
  };

  const handleRemoveQuestion = (index: number) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    navigate("/teacher/dashboard");
  };

  const topicOptions = [
    { value: "hometown", label: "Hometown" },
    { value: "hobbies", label: "Hobbies & Interests" },
    { value: "family", label: "Family" },
    { value: "work", label: "Work or Studies" },
    { value: "food", label: "Food" },
    { value: "weather", label: "Weather & Seasons" },
  ];

  const classOptions = [
    { value: "class1", label: "IELTS Prep - Morning (30 students)" },
    { value: "class2", label: "IELTS Prep - Evening (24 students)" },
    { value: "class3", label: "Advanced English (18 students)" },
  ];

  return (
    <TeacherLayout title="Create Assignment">
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="card p-6">
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Topic</label>
              <select 
                className="input-field w-full"
                value={title ? title : ""}
                onChange={(e) => setTitle(e.target.value)}
                required
              >
                <option value="" disabled>Select a topic</option>
                {topicOptions.map((option) => (
                  <option key={option.value} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Due Date</label>
              <input
                type="date"
                className="input-field w-full"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Assign to Class</label>
              <select
                className="input-field w-full"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                required
              >
                {classOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="card p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Questions</h3>
            </div>
            
            <div className="space-y-4">
              {questions.map((question, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="bg-secondary text-secondary-foreground rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-2">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <textarea
                      className="input-field w-full resize-none"
                      rows={2}
                      value={question}
                      onChange={(e) => handleQuestionChange(index, e.target.value)}
                      placeholder="Enter your question"
                      required
                    />
                  </div>
                  {questions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveQuestion(index)}
                      className="text-muted-foreground hover:text-destructive mt-2"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            
            <button
              type="button"
              onClick={handleAddQuestion}
              className="mt-4 inline-flex items-center text-primary hover:underline"
            >
              <PlusCircle size={16} className="mr-1" />
              Add Question
            </button>
          </div>
          
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate("/teacher/dashboard")}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary inline-flex items-center">
              <Save size={18} className="mr-2" />
              Save & Assign
            </button>
          </div>
        </form>
      </div>
    </TeacherLayout>
  );
};

export default CreateAssignment;
