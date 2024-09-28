// pages/admin/timetable.tsx
import React, { useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import AdminLayout from "@/components/AdminLayout";
import Button from "@/components/Button";
import { IoMdArrowRoundBack } from "react-icons/io";

// Mock data for timetable
const mockTimetable = [
  { id: 1, course: "Mathematics 101", lecturer: "Dr. John Doe", schedule: "Mon 10:00-11:30", hall: "Benson Hall" },
  { id: 2, course: "Physics 201", lecturer: "Prof. Jane Smith", schedule: "Tue 14:00-15:30", hall: "Science Complex Hall 3" },
  // Add more mock timetable data as needed
];

const GenerateTimetable = () => {
  const [timetable, setTimetable] = useState(mockTimetable);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateTimetable = async () => {
    setIsGenerating(true);
    try {
      // Simulate an API call to generate the timetable
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulated delay

      // Update with new mock data or fetched data
      setTimetable(mockTimetable);
      Swal.fire("Success", "Timetable has been generated successfully.", "success");
    } catch (error) {
      Swal.fire("Error", "An error occurred while generating the timetable.", "error");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-md">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/admin" className="text-blue-600 hover:underline">
              <IoMdArrowRoundBack />
            </Link>
            <h1 className="text-3xl font-bold text-blue-600">Generate Timetable</h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow container mx-auto px-6 py-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Timetable</h2>
            <div className="">
              <Button
                intent="primary"
                size="sm"
                text="Generate Timetable"
                isLoading={isGenerating}
                action={handleGenerateTimetable}
              />
            </div>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lecturer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Schedule
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hall
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {timetable.map((entry) => (
                  <tr key={entry.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {entry.course}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {entry.lecturer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {entry.schedule}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {entry.hall}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-4">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 Timetable Management System. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </AdminLayout>
  );
};

export default GenerateTimetable;
