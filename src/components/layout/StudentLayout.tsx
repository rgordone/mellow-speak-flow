
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Book, Settings } from "lucide-react";

interface StudentLayoutProps {
  children: React.ReactNode;
  title: string;
  hideNav?: boolean;
}

const StudentLayout: React.FC<StudentLayoutProps> = ({ children, title, hideNav = false }) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b border-border sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <div className="container py-4 mx-auto flex justify-between items-center">
          <h1 className="text-xl font-medium">IELTS Co-Pilot</h1>
          {!hideNav && (
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-full hover:bg-muted transition-colors">
                <Settings size={20} />
              </button>
            </div>
          )}
        </div>
      </header>
      
      <main className="flex-1 pt-6 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <h2 className="text-xl font-medium">{title}</h2>
          </div>
          <div className="page-transition">
            {children}
          </div>
        </div>
      </main>
      
      {!hideNav && (
        <nav className="fixed bottom-0 w-full border-t border-border bg-background py-2 px-4 flex justify-around">
          <Link 
            to="/student/dashboard" 
            className={`flex flex-col items-center gap-1 py-1 ${isActive('/student/dashboard') ? 'text-primary font-medium' : 'text-muted-foreground'}`}
          >
            <Home size={20} />
            <span className="text-xs">Home</span>
          </Link>
          <Link 
            to="/student/dashboard" 
            className={`flex flex-col items-center gap-1 py-1 ${isActive('/student/feedback') ? 'text-primary font-medium' : 'text-muted-foreground'}`}
          >
            <Book size={20} />
            <span className="text-xs">Assignments</span>
          </Link>
        </nav>
      )}
    </div>
  );
};

export default StudentLayout;
