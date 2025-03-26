
import React from "react";
import { Link } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import TeacherLayout from "@/components/layout/TeacherLayout";
import AssignmentCard, { AssignmentProps } from "@/components/common/AssignmentCard";

const TeacherDashboard = () => {
  // Mock data for assignments
  const assignments: AssignmentProps[] = [
    {
      id: "1",
      title: "Hometown",
      dueDate: "2023-07-15",
      submissionsCount: 12,
      totalStudents: 30,
      isTeacher: true,
    },
    {
      id: "2",
      title: "Hobbies & Interests",
      dueDate: "2023-07-20",
      submissionsCount: 8,
      totalStudents: 30,
      isTeacher: true,
    },
    {
      id: "3",
      title: "Family",
      dueDate: "2023-07-25",
      submissionsCount: 3,
      totalStudents: 30,
      isTeacher: true,
    },
  ];

  return (
    <TeacherLayout title="Dashboard">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-muted-foreground">Your recent assignments</h3>
        <Link 
          to="/teacher/create-assignment"
          className="btn-primary inline-flex items-center"
        >
          <PlusCircle size={18} className="mr-2" />
          Create Assignment
        </Link>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assignments.map((assignment) => (
          <AssignmentCard 
            key={assignment.id} 
            {...assignment} 
          />
        ))}
      </div>
      
      <div className="mt-12 card p-6">
        <h3 className="text-lg font-medium mb-4">Quick Stats</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-secondary">
            <div className="text-3xl font-medium">3</div>
            <div className="text-sm text-muted-foreground">Active Assignments</div>
          </div>
          <div className="p-4 rounded-lg bg-secondary">
            <div className="text-3xl font-medium">30</div>
            <div className="text-sm text-muted-foreground">Students</div>
          </div>
          <div className="p-4 rounded-lg bg-secondary">
            <div className="text-3xl font-medium">23</div>
            <div className="text-sm text-muted-foreground">Submissions</div>
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
};

export default TeacherDashboard;
