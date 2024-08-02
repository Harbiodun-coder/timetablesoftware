// pages/student/timetable.tsx
import React from "react";
import Link from "next/link";
import StudentLayout from "@/components/StudentLayout";
import Button from "@/components/Button";
import { IoMdArrowRoundBack } from "react-icons/io";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// Mock timetable data
const mockTimetable = [
  {
    id: 1,
    course: "Mathematics 101",
    lecturer: "Dr. Aiyeniko",
    day: "Monday",
    time: "10:00 - 11:30",
  },
  {
    id: 2,
    course: "Physics 201",
    lecturer: "Prof. Aribisala",
    day: "Tuesday",
    time: "14:00 - 15:30",
  },
  // Add more mock data as needed
];

const Timetable = () => {
  const handleDownloadPDF = async () => {
    const input = document.getElementById("timetable-table");
    if (input) {
      const canvas = await html2canvas(input);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("timetable.pdf");
    }
  };

  return (
    <StudentLayout>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-md">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/student" className="text-blue-600 hover:underline">
              <IoMdArrowRoundBack />
            </Link>
            <h1 className="text-3xl font-bold text-blue-600">Your Timetable</h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow container mx-auto px-6 py-16">
          <div className="flex justify-between items-center mb-8 w-[200px]">
            <Button
              intent="primary"
              size="sm"
              text="Download PDF"
              isLoading={false}
              action={handleDownloadPDF}
            />
          </div>

          <div id="timetable-table" className="bg-white shadow overflow-hidden sm:rounded-lg">
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
                    Day
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockTimetable.map((entry) => (
                  <tr key={entry.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {entry.course}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {entry.lecturer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {entry.day}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {entry.time}
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
    </StudentLayout>
  );
};

export default Timetable;
