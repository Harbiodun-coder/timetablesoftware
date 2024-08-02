// pages/index.tsx
import React from 'react';
import Link from 'next/link';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-600">Timetable Management System</h1>
          <nav>
            <Link href="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
            <Link href="/signup" className="ml-4 text-blue-600 hover:underline">
              Sign Up
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-4xl font-bold text-gray-900">Welcome to the Timetable Management System</h2>
        <p className="mt-4 text-lg text-gray-600">Easily manage and view your schedules with our comprehensive solution designed for Lagos State University.</p>
        <div className="mt-8">
          <Link href="/signup" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-blue-700">
           Get Started
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Features</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-blue-600">Manage Courses</h3>
              <p className="mt-4 text-gray-600">Easily add, edit, and delete courses to keep your schedule up-to-date.</p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-blue-600">Allocate Lecturers</h3>
              <p className="mt-4 text-gray-600">Assign lecturers to courses and manage their schedules efficiently.</p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-blue-600">Generate Timetables</h3>
              <p className="mt-4 text-gray-600">Automatically generate timetables with our advanced algorithm.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Timetable Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
