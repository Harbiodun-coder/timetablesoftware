import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import Button from "@/components/Button";
import AdminLayout from "@/components/AdminLayout";
import { IoMdArrowRoundBack } from "react-icons/io";

type Hall = {
  _id: string; 
  name: string;
  capacity: number;
};

const ManageHalls = () => {
  const [halls, setHalls] = useState<Hall[]>([]); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newHall, setNewHall] = useState({ name: "", capacity: 0 });
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentHallId, setCurrentHallId] = useState<string | null>(null);

  // Fetch all halls from backend
  useEffect(() => {
    const fetchHalls = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/halls", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("timetable-token")}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch halls");
        }
        const data = await response.json();
        setHalls(data); // Set fetched halls from backend
      } catch (error) {
        console.error("Error fetching halls:", error);
      }
    };
    fetchHalls();
  }, []);

  // Delete a hall by making a DELETE request to the backend
  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this hall?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`http://localhost:5000/api/halls/${id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("timetable-token")}`,
            },
          });
          if (!response.ok) {
            throw new Error("Failed to delete hall");
          }
          setHalls(halls.filter((hall) => hall._id !== id)); // Remove deleted hall from state
          Swal.fire("Deleted!", "The hall has been deleted.", "success");
        } catch (error) {
          Swal.fire("Error", "Failed to delete the hall.", "error");
        }
      }
    });
  };

  // Add or update hall by sending POST or PUT request to the backend
  const handleSaveHall = async () => {
    if (newHall.name && newHall.capacity > 0) {
      try {
        if (isEditMode && currentHallId !== null) {
          // Edit existing hall
          const response = await fetch(`http://localhost:5000/api/halls/${currentHallId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("timetable-token")}`,
            },
            body: JSON.stringify(newHall),
          });
          if (!response.ok) {
            throw new Error("Failed to update hall");
          }
          const updatedHall = await response.json();
          setHalls(halls.map((hall) => (hall._id === currentHallId ? updatedHall : hall)));
          Swal.fire("Updated!", "The hall has been updated.", "success");
        } else {
          // Add new hall
          const response = await fetch("http://localhost:5000/api/halls", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("timetable-token")}`,
            },
            body: JSON.stringify(newHall),
          });
          if (!response.ok) {
            throw new Error("Failed to add hall");
          }
          const newHallData = await response.json();
          setHalls([...halls, newHallData]); // Add the new hall to state
          Swal.fire("Added!", "The hall has been added.", "success");
        }
        // Reset modal and form
        setNewHall({ name: "", capacity: 0 });
        setIsModalOpen(false);
        setIsEditMode(false);
        setCurrentHallId(null);
      } catch (error) {
        Swal.fire("Error", "Failed to save the hall. Please try again.", "error");
      }
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
    setCurrentHallId(hall._id);
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
                  <tr key={hall._id}>
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
                        onClick={() => handleDelete(hall._id)}
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
                value={newHall.capacity.toString()} // Convert number to string here
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
