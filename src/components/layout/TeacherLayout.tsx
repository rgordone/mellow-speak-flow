
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Book, Settings } from "lucide-react";

interface TeacherLayoutProps {
  children: React.ReactNode;
  title: string;
}

const TeacherLayout: React.FC<TeacherLayoutProps> = ({ children, title }) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b border-border sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <div className="container py-4 mx-auto flex justify-between items-center">
          <h1 className="text-xl font-medium">IELTS Co-Pilot</h1>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6">
              <Link 
                to="/teacher/dashboard" 
                className={`flex items-center gap-2 transition-colors ${isActive('/teacher/dashboard') ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'}`}
              >
                <Home size={18} />
                <span>Dashboard</span>
              </Link>
              <Link 
                to="/teacher/create-assignment" 
                className={`flex items-center gap-2 transition-colors ${isActive('/teacher/create-assignment') ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'}`}
              >
                <Book size={18} />
                <span>Assignments</span>
              </Link>
            </nav>
            <button className="p-2 rounded-full hover:bg-muted transition-colors">
              <Settings size={20} />
            </button>
          </div>
        </div>
      </header>
      
      <main className="flex-1 pt-6 pb-12">
        <div className="container mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-medium">{title}</h2>
          </div>
          <div className="page-transition">
            {children}
          </div>
        </div>
      </main>
      
      <footer className="py-6 border-t border-border bg-muted/30">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} IELTS Co-Pilot • Teacher Dashboard
        </div>
      </footer>
    </div>
  );
};

export default TeacherLayout;
