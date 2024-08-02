import React, { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { FaEdit, FaSave, FaTimes, FaUpload } from "react-icons/fa";

const initialProfile = {
  name: 'Matthew Abiodun',
  email: 'matthewabiodun2001@gmail.com',
  phone: '+1234567890',
  address: '123 Main St, Anytown, USA',
  role: 'Admin',
  profileImage: '/admin.png', 
};

const Profile = () => {
  const [profile, setProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);
  const [image, setImage] = useState<File | null>(null);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setFormData(profile);
    setImage(null); 
    setIsEditing(false);
  };

  const handleSaveClick = () => {
    setProfile(prevProfile => ({
      ...prevProfile,
      ...formData,
      profileImage: image ? URL.createObjectURL(image) : prevProfile.profileImage, // Update profile image
    }));
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImage(file);
    }
  };

  return (
    <AdminLayout>
      <div className="bg-white p-4 shadow rounded">
        <div className="flex flex-col md:flex-row items-center mb-6">
          <div className="relative">
            <img
              src={image ? URL.createObjectURL(image) : profile.profileImage}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover mb-4 md:mb-0 md:mr-6"
            />
            {isEditing && (
              <label
                htmlFor="profileImage"
                className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full cursor-pointer"
              >
                <FaUpload />
                <input
                  type="file"
                  id="profileImage"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{profile.name}</h1>
            {isEditing ? (
              <div className="flex items-center mt-4 space-x-2">
                <button
                  onClick={handleSaveClick}
                  className="bg-blue-600 text-white px-4 py-2 rounded flex items-center"
                >
                  <FaSave className="mr-2" /> Save
                </button>
                <button
                  onClick={handleCancelClick}
                  className="bg-gray-600 text-white px-4 py-2 rounded flex items-center"
                >
                  <FaTimes className="mr-2" /> Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={handleEditClick}
                className="bg-yellow-600 text-white px-4 py-2 rounded flex items-center mt-4"
              >
                <FaEdit className="mr-2" /> Edit
              </button>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                  />
                ) : (
                  <p>{profile.email}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700">Phone</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                  />
                ) : (
                  <p>{profile.phone}</p>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700">Address</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                  />
                ) : (
                  <p>{profile.address}</p>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700">Role</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                  />
                ) : (
                  <p>{profile.role}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Profile;
