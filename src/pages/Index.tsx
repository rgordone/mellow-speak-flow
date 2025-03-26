
import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <div className="container py-4 mx-auto flex justify-between items-center">
          <h1 className="text-xl font-medium">IELTS Co-Pilot</h1>
        </div>
      </header>
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col items-center text-center mb-12 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">IELTS Speaking Practice</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Simplified practice platform for IELTS speaking preparation. 
              Teachers assign questions, students record responses.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mt-10">
            <div className="card p-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <h2 className="text-2xl font-medium mb-4">For Teachers</h2>
              <p className="text-muted-foreground mb-6">
                Create speaking assignments for your students, monitor progress, 
                and provide valuable feedback to help them improve.
              </p>
              <Link to="/teacher/dashboard" className="btn-primary inline-flex items-center">
                Teacher Dashboard
                <ChevronRight size={18} className="ml-1" />
              </Link>
            </div>
            
            <div className="card p-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <h2 className="text-2xl font-medium mb-4">For Students</h2>
              <p className="text-muted-foreground mb-6">
                Practice your IELTS speaking skills with real exam-style questions
                and receive personalized feedback from your teacher.
              </p>
              <Link to="/student/dashboard" className="btn-primary inline-flex items-center">
                Student Dashboard
                <ChevronRight size={18} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="py-6 border-t border-border bg-muted/30">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} IELTS Co-Pilot
        </div>
      </footer>
    </div>
  );
};

export default Index;
