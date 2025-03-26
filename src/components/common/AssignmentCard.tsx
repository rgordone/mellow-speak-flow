
import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Users, ChevronRight } from "lucide-react";

export interface AssignmentProps {
  id: string;
  title: string;
  dueDate: string;
  submissionsCount?: number;
  totalStudents?: number;
  isTeacher?: boolean;
  status?: "not_started" | "in_progress" | "submitted";
}

const AssignmentCard: React.FC<AssignmentProps> = ({
  id,
  title,
  dueDate,
  submissionsCount,
  totalStudents,
  isTeacher = false,
  status = "not_started",
}) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const getStatusClasses = () => {
    switch (status) {
      case "not_started":
        return "bg-muted text-muted-foreground";
      case "in_progress":
        return "bg-yellow-100 text-yellow-800";
      case "submitted":
        return "bg-green-100 text-green-800";
      default:
        return "bg-muted text-muted-foreground";
    }
  };
  
  const getStatusText = () => {
    switch (status) {
      case "not_started":
        return "Not Started";
      case "in_progress":
        return "In Progress";
      case "submitted":
        return "Submitted";
      default:
        return "Not Started";
    }
  };
  
  return (
    <div className="card card-hover">
      <div className="flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-medium">{title}</h3>
          {!isTeacher && (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClasses()}`}>
              {getStatusText()}
            </span>
          )}
        </div>
        
        <div className="flex flex-col space-y-3">
          <div className="flex items-center text-muted-foreground">
            <Calendar size={16} className="mr-2" />
            <span className="text-sm">Due {formatDate(dueDate)}</span>
          </div>
          
          {isTeacher && submissionsCount !== undefined && totalStudents !== undefined && (
            <div className="flex items-center text-muted-foreground">
              <Users size={16} className="mr-2" />
              <span className="text-sm">{submissionsCount}/{totalStudents} Submitted</span>
            </div>
          )}
        </div>
        
        <div className="mt-4 pt-3 border-t border-border flex justify-end">
          <Link
            to={isTeacher ? `/teacher/assignments/${id}` : `/student/assignment/${id}`}
            className="flex items-center text-primary hover:underline font-medium"
          >
            {isTeacher ? "View Submissions" : "Start Assignment"}
            <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AssignmentCard;
