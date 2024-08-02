
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { IoMdArrowRoundBack } from "react-icons/io";
import LecturerLayout from "@/components/LecturerLayout";

const mockTimetable = [
  { id: 1, course: "Physics 201", day: "Monday", time: "10:00-11:30", hall: "B202" },
  { id: 2, course: "Mathematics 101", day: "Wednesday", time: "10:00-11:30", hall: "A101" },
  { id: 3, course: "Chemistry 301", day: "Friday", time: "14:00-15:30", hall: "C303" },
];

const LecturerTimetable = () => {
  const [timetable, setTimetable] = useState(mockTimetable);

  useEffect(() => {
    
   
    // fetch('/api/lecturer/timetable')
    //   .then(response => response.json())
    //   .then(data => setTimetable(data))
    //   .catch(error => console.error('Error fetching timetable:', error));
  }, []);

  return (
    <LecturerLayout>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-md">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/lecturer" className="text-blue-600 hover:underline">
              <IoMdArrowRoundBack />
            </Link>
            <h1 className="text-3xl font-bold text-blue-600">Timetable</h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow container mx-auto px-6 py-16">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Your Timetable</h2>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Course
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Day
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hall
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {timetable.map((slot) => (
                    <tr key={slot.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {slot.course}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {slot.day}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {slot.time}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {slot.hall}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-4">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 Timetable Management System. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </LecturerLayout>
  );
};

export default LecturerTimetable;
