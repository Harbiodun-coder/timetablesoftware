import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import Button from "@/components/Button";
import AdminLayout from "@/components/AdminLayout";
import { IoMdArrowRoundBack } from "react-icons/io";

type Course = {
  _id: string;
  name: string;
  lecturer: string;
  day: string;
  time: string;
  schedule: string;
};

const ManageCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({
    name: "",
    lecturer: "",
    day: "",
    time: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentCourseId, setCurrentCourseId] = useState<string | null>(null);

  const API_URL = "http://localhost:5000/api/courses";

  // Fetch courses from backend
  const fetchCourses = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setCourses(data.data);
    } catch (err) {
      console.error("Failed to fetch courses", err);
      Swal.fire("Error", "Failed to load courses", "error");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Save or update course
  const handleSaveCourse = async () => {
    if (
      !newCourse.name ||
      !newCourse.lecturer ||
      !newCourse.day ||
      !newCourse.time
    ) {
      Swal.fire("Error", "Please fill in all fields", "error");
      return;
    }

    try {
      if (isEditMode && currentCourseId) {
        // Update course
        const res = await fetch(`${API_URL}/${currentCourseId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newCourse),
        });
        const data = await res.json();
        setCourses(
          courses.map((c) => (c._id === currentCourseId ? data.data : c))
        );
        Swal.fire("Updated!", "Course updated successfully", "success");
      } else {
        // Add new course
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newCourse),
        });
        const data = await res.json();
        setCourses([...courses, data.data]);
        Swal.fire("Added!", "Course added successfully", "success");
      }

      setIsModalOpen(false);
      setNewCourse({ name: "", lecturer: "", day: "", time: "" });
      setIsEditMode(false);
      setCurrentCourseId(null);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to save course", "error");
    }
  };

  // Delete course
  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this course?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });

    if (result.isConfirmed) {
      try {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        setCourses(courses.filter((c) => c._id !== id));
        Swal.fire("Deleted!", "Course deleted successfully", "success");
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to delete course", "error");
      }
    }
  };

  // Edit course
  const handleEditCourse = (course: Course) => {
    setNewCourse({
      name: course.name,
      lecturer: course.lecturer,
      day: course.day,
      time: course.time,
    });
    setIsEditMode(true);
    setCurrentCourseId(course._id);
    setIsModalOpen(true);
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-[white] flex flex-col">
        <header className="bg-white shadow-md">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/admin" className="text-blue-600 hover:underline">
              <IoMdArrowRoundBack />
            </Link>
            <h1 className="text-3xl font-bold text-blue-600">Manage Courses</h1>
          </div>
        </header>

        <main className="flex-grow container mx-auto px-6 py-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Courses</h2>
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
                  <tr key={course._id}>
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
                        onClick={() => handleDelete(course._id)}
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

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="mt-3 text-center sm:mt-5">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {isEditMode ? "Edit Course" : "Add New Course"}
            </h3>
            <div className="mt-2 space-y-3">
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
          <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse gap-2">
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

        <footer className="bg-gray-800 text-white py-4 mt-auto">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 Timetable Management System. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </AdminLayout>
  );
};

export default ManageCourses;
