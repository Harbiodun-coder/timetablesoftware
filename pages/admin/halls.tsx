// pages/admin/halls.tsx
import React, { useState } from "react";
import Link from "next/link";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import Button from "@/components/Button";
import AdminLayout from "@/components/AdminLayout";
import { IoMdArrowRoundBack } from "react-icons/io";

type Hall = {
  id: number;
  name: string;
  capacity: number;
};

const mockHalls: Hall[] = [
  { id: 1, name: "Science Complex Hall 1", capacity: 100 },
  { id: 2, name: "Science Complex Hall 2", capacity: 200 },
];

const ManageHalls = () => {
  const [halls, setHalls] = useState<Hall[]>(mockHalls);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newHall, setNewHall] = useState({ name: "", capacity: 0 });
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentHallId, setCurrentHallId] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this hall?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        setHalls(halls.filter((hall) => hall.id !== id));
        Swal.fire("Deleted!", "The hall has been deleted.", "success");
      }
    });
  };

  const handleSaveHall = () => {
    if (newHall.name && newHall.capacity > 0) {
      if (isEditMode && currentHallId !== null) {
        setHalls(
          halls.map((hall) =>
            hall.id === currentHallId ? { ...hall, ...newHall } : hall
          )
        );
        Swal.fire("Updated!", "The hall has been updated.", "success");
      } else {
        setHalls([...halls, { ...newHall, id: halls.length + 1 }]);
        Swal.fire("Added!", "The hall has been added.", "success");
      }
      setNewHall({ name: "", capacity: 0 });
      setIsModalOpen(false);
      setIsEditMode(false);
      setCurrentHallId(null);
    } else {
      Swal.fire({
        title: "Error",
        text: "Please fill in all fields correctly",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleEditHall = (hall: Hall) => {
    setNewHall({ name: hall.name, capacity: hall.capacity });
    setIsEditMode(true);
    setCurrentHallId(hall.id);
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
            <h1 className="text-3xl font-bold text-blue-600">Manage Halls</h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow container mx-auto px-6 py-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Lecture Halls</h2>
            <div className="">
              <Button
                intent="primary"
                size="sm"
                text="Add Hall"
                isLoading={false}
                action={() => {
                  setIsEditMode(false);
                  setCurrentHallId(null);
                  setNewHall({ name: "", capacity: 0 });
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
                    Hall Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Capacity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {halls.map((hall) => (
                  <tr key={hall.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {hall.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {hall.capacity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEditHall(hall)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(hall.id)}
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

        {/* Add/Edit Hall Modal */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="mt-3 text-center sm:mt-5">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {isEditMode ? "Edit Hall" : "Add New Hall"}
            </h3>
            <div className="mt-2">
              <Input
                label="Hall Name"
                name="name"
                type="text"
                value={newHall.name}
                change={(e) => setNewHall({ ...newHall, name: e.target.value })}
                placeholder={""}
              />
              <Input
                label="Capacity"
                name="capacity"
                type="number"
                change={(e) =>
                  setNewHall({ ...newHall, capacity: Number(e.target.value) })
                }
                placeholder={""}
                value={newHall.capacity}
              />
            </div>
          </div>
          <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
            <Button
              intent="primary"
              size="bg"
              text={isEditMode ? "Save Changes" : "Add Hall"}
              isLoading={false}
              action={handleSaveHall}
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

export default ManageHalls;
