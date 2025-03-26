
import React from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, CheckCircle, Clock, X } from "lucide-react";
import TeacherLayout from "@/components/layout/TeacherLayout";

interface StudentSubmission {
  id: string;
  name: string;
  status: "not_started" | "in_progress" | "submitted";
  submittedAt?: string;
  reportAvailable?: boolean;
}

const SubmissionOverview = () => {
  const { assignmentId } = useParams();
  
  // Mock data for student submissions
  const assignmentTitle = "Hometown";
  const dueDate = "July 15, 2023";
  
  const studentSubmissions: StudentSubmission[] = [
    { id: "1", name: "Emma Thompson", status: "submitted", submittedAt: "2023-07-10T14:30:00", reportAvailable: true },
    { id: "2", name: "James Wilson", status: "submitted", submittedAt: "2023-07-11T09:15:00", reportAvailable: true },
    { id: "3", name: "Sophia Garcia", status: "in_progress" },
    { id: "4", name: "Liam Johnson", status: "not_started" },
    { id: "5", name: "Olivia Chen", status: "submitted", submittedAt: "2023-07-09T16:45:00", reportAvailable: true },
    { id: "6", name: "Noah Park", status: "not_started" },
    { id: "7", name: "Ava Rodriguez", status: "in_progress" },
    { id: "8", name: "William Kim", status: "submitted", submittedAt: "2023-07-08T11:20:00", reportAvailable: true },
    { id: "9", name: "Isabella Singh", status: "not_started" },
    { id: "10", name: "Benjamin Lee", status: "submitted", submittedAt: "2023-07-12T10:05:00", reportAvailable: true },
  ];
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "submitted":
        return <CheckCircle size={18} className="text-green-600" />;
      case "in_progress":
        return <Clock size={18} className="text-amber-500" />;
      case "not_started":
        return <X size={18} className="text-muted-foreground" />;
      default:
        return null;
    }
  };
  
  const getStatusText = (status: string) => {
    switch (status) {
      case "submitted":
        return "Submitted";
      case "in_progress":
        return "In Progress";
      case "not_started":
        return "Not Started";
      default:
        return "";
    }
  };
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <TeacherLayout title={`Assignment: ${assignmentTitle}`}>
      <div className="mb-6">
        <Link 
          to="/teacher/dashboard" 
          className="inline-flex items-center text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft size={16} className="mr-1" />
          Back to Dashboard
        </Link>
      </div>
      
      <div className="card p-6 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium mb-2">Assignment Details</h3>
            <p className="text-muted-foreground">Due: {dueDate}</p>
          </div>
          <div className="bg-secondary py-1 px-3 rounded-full text-sm">
            {studentSubmissions.filter(s => s.status === "submitted").length}/{studentSubmissions.length} Submitted
          </div>
        </div>
      </div>
      
      <div className="card p-6">
        <h3 className="text-lg font-medium mb-4">Student Submissions</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium">Student</th>
                <th className="text-left py-3 px-4 font-medium">Status</th>
                <th className="text-left py-3 px-4 font-medium">Submitted</th>
                <th className="text-right py-3 px-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {studentSubmissions.map((student) => (
                <tr key={student.id} className="border-b border-border hover:bg-muted/20">
                  <td className="py-3 px-4">{student.name}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      {getStatusIcon(student.status)}
                      <span className="ml-2">{getStatusText(student.status)}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">{formatDate(student.submittedAt)}</td>
                  <td className="py-3 px-4 text-right">
                    {student.reportAvailable ? (
                      <Link
                        to={`/teacher/reports/${assignmentId}/${student.id}`}
                        className="inline-flex items-center text-primary hover:underline"
                      >
                        View Report
                        <ChevronRight size={16} className="ml-1" />
                      </Link>
                    ) : (
                      <span className="text-muted-foreground">Not Available</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </TeacherLayout>
  );
};

export default SubmissionOverview;
