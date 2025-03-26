
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Teacher Pages
import TeacherDashboard from "./pages/teacher/Dashboard";
import CreateAssignment from "./pages/teacher/CreateAssignment";
import SubmissionOverview from "./pages/teacher/SubmissionOverview";
import StudentReport from "./pages/teacher/StudentReport";

// Student Pages
import StudentDashboard from "./pages/student/Dashboard";
import Assignment from "./pages/student/Assignment";
import Feedback from "./pages/student/Feedback";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Teacher Routes */}
          <Route path="/teacher" element={<Navigate to="/teacher/dashboard" replace />} />
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="/teacher/create-assignment" element={<CreateAssignment />} />
          <Route path="/teacher/assignments/:assignmentId" element={<SubmissionOverview />} />
          <Route path="/teacher/reports/:assignmentId/:studentId" element={<StudentReport />} />
          
          {/* Student Routes */}
          <Route path="/student" element={<Navigate to="/student/dashboard" replace />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/assignment/:assignmentId" element={<Assignment />} />
          <Route path="/student/feedback/:assignmentId" element={<Feedback />} />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
