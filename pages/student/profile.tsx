// pages/student/profile.tsx
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import StudentLayout from "@/components/StudentLayout";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Modal from "@/components/Modal";

const mockProfile = {
  name: "Francis Matthew Abiodun",
  email: "matthewabiodun2001@gmail.com",
  course: "Computer Science",
  year: "4",
  imageUrl: "/admin.png", 
};

const StudentProfile = () => {
  const [profile, setProfile] = useState(mockProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(profile.imageUrl);
  const [newImage, setNewImage] = useState<File | null>(null);

  useEffect(() => {
   
    // fetch('/api/student/profile')
    //   .then(response => response.json())
    //   .then(data => {
    //     setProfile(data);
    //     setFormData(data);
    //   })
    //   .catch(error => console.error('Error fetching profile:', error));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    
    setProfile(formData);
    setIsEditing(false);
   
    // fetch('/api/student/profile', {
    //   method: 'PUT',
    //   body: JSON.stringify(formData),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })
    //   .then(response => response.json())
    //   .then(data => setProfile(data))
    //   .catch(error => console.error('Error saving profile:', error));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageSave = () => {
    // Save the new image (e.g., send to an API)
    setProfile({ ...profile, imageUrl });
    setImageModalOpen(false);
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
            <h1 className="text-3xl font-bold text-blue-600">Student Profile</h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow container mx-auto px-6 py-16">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center mb-8">
              <div className="relative">
                <img
                  src={imageUrl}
                  alt="Profile"
                  className="w-24 h-24 rounded-full border border-gray-300"
                />
                {isEditing && (
                  <button
                    className="absolute bottom-0 right-0 p-1 bg-blue-500 text-white rounded-full"
                    onClick={() => setImageModalOpen(true)}
                  >
                    <FaEdit />
                  </button>
                )}
              </div>
              <div className="ml-6">
                <h2 className="text-2xl font-bold text-gray-900">Profile Details</h2>
                {!isEditing && (
                  <Button
                    intent="primary"
                    size="sm"
                    text="Edit Profile"
                    isLoading={false}
                    action={() => setIsEditing(true)}
                  />
                )}
              </div>
            </div>

            <div className="space-y-6">
              {isEditing ? (
                <div>
                  <Input
                    label="Name"
                    name="name"
                    type="text"
                    value={formData.name}
                    change={handleInputChange}
                  />
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    change={handleInputChange}
                  />
                  <Input
                    label="Course"
                    name="course"
                    type="text"
                    value={formData.course}
                    change={handleInputChange}
                  />
                  <Input
                    label="Year"
                    name="year"
                    type="text"
                    value={formData.year}
                    change={handleInputChange}
                  />
                  <div className="mt-4 flex justify-end gap-4">
                    <Button
                      intent="primary"
                      size="md"
                      text="Save"
                      isLoading={false}
                      action={handleSave}
                    />
                    <Button
                      intent="outline"
                      size="md"
                      text="Cancel"
                      isLoading={false}
                      action={() => setIsEditing(false)}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-lg font-medium text-gray-900">Name: {profile.name}</p>
                  <p className="text-lg text-gray-700">Email: {profile.email}</p>
                  <p className="text-lg text-gray-700">Course: {profile.course}</p>
                  <p className="text-lg text-gray-700">Year: {profile.year}</p>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Image Upload Modal */}
        <Modal isOpen={imageModalOpen} onClose={() => setImageModalOpen(false)}>
          <div className="mt-3 text-center sm:mt-5">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Upload Profile Picture
            </h3>
            <div className="mt-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="mb-4"
              />
              {newImage && (
                <img
                  src={URL.createObjectURL(newImage)}
                  alt="Preview"
                  className="w-32 h-32 mx-auto rounded-full border border-gray-300"
                />
              )}
            </div>
          </div>
          <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
            <Button
              intent="primary"
              size="bg"
              text="Save Image"
              isLoading={false}
              action={handleImageSave}
            />
            <Button
              intent="outline"
              size="bg"
              text="Cancel"
              isLoading={false}
              action={() => setImageModalOpen(false)}
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
    </StudentLayout>
  );
};

export default StudentProfile;
