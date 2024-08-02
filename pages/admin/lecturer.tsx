// pages/admin/lecturer.tsx
import React, { useState } from "react";
import Link from "next/link";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import Button from "@/components/Button";
import AdminLayout from "@/components/AdminLayout";
import { IoMdArrowRoundBack } from "react-icons/io";

type Lecturer = {
  id: number;
  name: string;
  email: string;
};

const mockLecturers: Lecturer[] = [
  { id: 1, name: "Dr. Aiyeniko", email: "aiyeniko.kayode@example.com" },
  { id: 2, name: "Prof. Aribisala", email: "Aribisala.benjamin@example.com" },
  // Add more mock lecturers as needed
];

const ManageLecturers = () => {
  const [lecturers, setLecturers] = useState<Lecturer[]>(mockLecturers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newLecturer, setNewLecturer] = useState({ name: "", email: "" });
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentLecturerId, setCurrentLecturerId] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this lecturer?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        setLecturers(lecturers.filter((lecturer) => lecturer.id !== id));
        Swal.fire("Deleted!", "The lecturer has been deleted.", "success");
      }
    });
  };

  const handleSaveLecturer = () => {
    if (newLecturer.name && newLecturer.email) {
      if (isEditMode && currentLecturerId !== null) {
        setLecturers(
          lecturers.map((lecturer) =>
            lecturer.id === currentLecturerId ? { ...lecturer, ...newLecturer } : lecturer
          )
        );
        Swal.fire("Updated!", "The lecturer has been updated.", "success");
      } else {
        setLecturers([...lecturers, { ...newLecturer, id: lecturers.length + 1 }]);
        Swal.fire("Added!", "The lecturer has been added.", "success");
      }
      setNewLecturer({ name: "", email: "" });
      setIsModalOpen(false);
      setIsEditMode(false);
      setCurrentLecturerId(null);
    } else {
      Swal.fire({
        title: "Error",
        text: "Please fill in all fields correctly",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleEditLecturer = (lecturer: Lecturer) => {
    setNewLecturer({ name: lecturer.name, email: lecturer.email });
    setIsEditMode(true);
    setCurrentLecturerId(lecturer.id);
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
            <h1 className="text-3xl font-bold text-blue-600">Manage Lecturers</h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow container mx-auto px-6 py-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Lecturers</h2>
            <div className="">
              <Button
                intent="primary"
                size="sm"
                text="Add Lecturer"
                isLoading={false}
                action={() => {
                  setIsEditMode(false);
                  setCurrentLecturerId(null);
                  setNewLecturer({ name: "", email: "" });
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
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {lecturers.map((lecturer) => (
                  <tr key={lecturer.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {lecturer.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {lecturer.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEditLecturer(lecturer)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(lecturer.id)}
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

        {/* Add/Edit Lecturer Modal */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="mt-3 text-center sm:mt-5">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {isEditMode ? "Edit Lecturer" : "Add New Lecturer"}
            </h3>
            <div className="mt-2">
              <Input
                label="Name"
                name="name"
                type="text"
                value={newLecturer.name}
                change={(e) =>
                  setNewLecturer({ ...newLecturer, name: e.target.value })
                }
                placeholder={""}
              />
              <Input
                label="Email"
                name="email"
                type="email"
                value={newLecturer.email}
                change={(e) =>
                  setNewLecturer({ ...newLecturer, email: e.target.value })
                }
                placeholder={""}
              />
            </div>
          </div>
          <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
            <Button
              intent="primary"
              size="bg"
              text={isEditMode ? "Save Changes" : "Add Lecturer"}
              isLoading={false}
              action={handleSaveLecturer}
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

export default ManageLecturers;
