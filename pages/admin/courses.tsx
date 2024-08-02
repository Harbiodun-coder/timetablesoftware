// pages/admin/courses.tsx
import React, { useState } from "react";
import Link from "next/link";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import Button from "@/components/Button";
import AdminLayout from "@/components/AdminLayout";
import { IoMdArrowRoundBack } from "react-icons/io";

// Define the Course type
type Course = {
  id: number;
  name: string;
  lecturer: string;
  schedule: string;
};

const mockCourses: Course[] = [
  // {
  //   id: 1,
  //   name: "Mathematics 101",
  //   lecturer: "Dr. John Doe",
  //   schedule: "Mon & Wed 10:00-11:30",
  // },
  // {
  //   id: 2,
  //   name: "Physics 201",
  //   lecturer: "Dr. Jane Smith",
  //   schedule: "Tue & Thu 14:00-15:30",
  // },
  // // Add more mock courses as needed
];

const ManageCourses = () => {
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({
    name: "",
    lecturer: "",
    day: "",
    time: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentCourseId, setCurrentCourseId] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this course?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        setCourses(courses.filter((course) => course.id !== id));
        Swal.fire("Deleted!", "The course has been deleted.", "success");
      }
    });
  };

  const handleSaveCourse = () => {
    if (newCourse.name && newCourse.lecturer && newCourse.day && newCourse.time) {
      const schedule = `${newCourse.day} ${newCourse.time}`;
      if (isEditMode && currentCourseId !== null) {
        setCourses(
          courses.map((course) =>
            course.id === currentCourseId ? { ...course, ...newCourse, schedule } : course
          )
        );
        Swal.fire("Updated!", "The course has been updated.", "success");
      } else {
        setCourses([...courses, { ...newCourse, schedule, id: courses.length + 1 }]);
        Swal.fire("Added!", "The course has been added.", "success");
      }
      setNewCourse({ name: "", lecturer: "", day: "", time: "" });
      setIsModalOpen(false);
      setIsEditMode(false);
      setCurrentCourseId(null);
    } else {
      Swal.fire({
        title: "Error",
        text: "Please fill in all fields",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleEditCourse = (course: Course) => {
    const [day, ...timeParts] = course.schedule.split(" ");
    const time = timeParts.join(" ");
    setNewCourse({ name: course.name, lecturer: course.lecturer, day, time });
    setIsEditMode(true);
    setCurrentCourseId(course.id);
    setIsModalOpen(true);
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-[white] flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-md">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/admin" className="text-blue-600 hover:underline">
              <IoMdArrowRoundBack />
            </Link>
            <h1 className="text-3xl font-bold text-blue-600">Manage Courses</h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow container mx-auto px-6 py-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Courses</h2>
            <div className="">
              <Button
                intent="primary"
                size="sm"
                text="Add Course"
                isLoading={false}
                action={() => {
                  setIsEditMode(false);
                  setCurrentCourseId(null);
                  setNewCourse({ name: "", lecturer: "", day: "", time: "" });
                  setIsModalOpen(true);
                }}
              />
            </div>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lecturer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Schedule
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {courses.map((course) => (
                  <tr key={course.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {course.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {course.lecturer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {course.schedule}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEditCourse(course)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(course.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>

        {/* Add/Edit Course Modal */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="mt-3 text-center sm:mt-5">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {isEditMode ? "Edit Course" : "Add New Course"}
            </h3>
            <div className="mt-2">
              <Input
                label="Course Name"
                name="name"
                type="text"
                value={newCourse.name}
                change={(e) =>
                  setNewCourse({ ...newCourse, name: e.target.value })
                }
                placeholder={"Course Code"}
              />
              <Input
                label="Lecturer"
                name="lecturer"
                type="text"
                value={newCourse.lecturer}
                change={(e) =>
                  setNewCourse({ ...newCourse, lecturer: e.target.value })
                }
                placeholder={"Lecturer"}
              />
              <Input
                label="Day"
                name="day"
                type="text"
                value={newCourse.day}
                change={(e) =>
                  setNewCourse({ ...newCourse, day: e.target.value })
                }
                placeholder={"Days Schedule for the course"}
              />
              <Input
                label="Time"
                name="time"
                type="text"
                value={newCourse.time}
                change={(e) =>
                  setNewCourse({ ...newCourse, time: e.target.value })
                }
                placeholder={"Time"}
              />
            </div>
          </div>
          <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
            <Button
              intent="primary"
              size="bg"
              text={isEditMode ? "Save Changes" : "Add Course"}
              isLoading={false}
              action={handleSaveCourse}
            />
            <Button
              intent="outline"
              size="bg"
              text="Cancel"
              isLoading={false}
              action={() => setIsModalOpen(false)}
            />
          </div>
        </Modal>

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

export default ManageCourses;
