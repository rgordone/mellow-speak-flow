
import React from "react";
import { Link } from "react-router-dom";
import StudentLayout from "@/components/layout/StudentLayout";
import AssignmentCard, { AssignmentProps } from "@/components/common/AssignmentCard";

const StudentDashboard = () => {
  // Mock data for assignments
  const assignments: AssignmentProps[] = [
    {
      id: "1",
      title: "Hometown",
      dueDate: "2023-07-15",
      status: "not_started"
    },
    {
      id: "2",
      title: "Hobbies & Interests",
      dueDate: "2023-07-20",
      status: "in_progress"
    },
    {
      id: "3",
      title: "Family",
      dueDate: "2023-07-10",
      status: "submitted"
    },
  ];

  // Filter assignments
  const pendingAssignments = assignments.filter(a => a.status !== "submitted");
  const completedAssignments = assignments.filter(a => a.status === "submitted");

  return (
    <StudentLayout title="Your Assignments">
      <div className="space-y-6">
        {pendingAssignments.length > 0 && (
          <section>
            <h3 className="text-lg font-medium mb-4">Pending Assignments</h3>
            <div className="space-y-4">
              {pendingAssignments.map((assignment) => (
                <AssignmentCard 
                  key={assignment.id} 
                  {...assignment} 
                />
              ))}
            </div>
          </section>
        )}
        
        {completedAssignments.length > 0 && (
          <section className="mt-8">
            <h3 className="text-lg font-medium mb-4">Completed Assignments</h3>
            <div className="space-y-4">
              {completedAssignments.map((assignment) => (
                <div key={assignment.id} className="card">
                  <div className="flex justify-between">
                    <h4 className="font-medium">{assignment.title}</h4>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      Submitted
                    </span>
                  </div>
                  <div className="mt-4 flex items-center justify-end">
                    <Link
                      to={`/student/feedback/${assignment.id}`}
                      className="text-primary hover:underline font-medium"
                    >
                      View Feedback
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {assignments.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No assignments yet.</p>
          </div>
        )}
      </div>
    </StudentLayout>
  );
};

export default StudentDashboard;
