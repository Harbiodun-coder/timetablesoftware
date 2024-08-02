import AdminLayout from '@/components/AdminLayout'
import Link from 'next/link'
import React from 'react'
import { FaBook, FaCalendarAlt, FaChalkboardTeacher, FaUniversity } from 'react-icons/fa'

export default function index() {
  return (
    <AdminLayout>
     <div className="min-h-screen bg-[white] flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-600">Admin Portal</h1>
         
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-6 py-16">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900">Welcome to the Admin Portal</h2>
          <p className="mt-4 text-lg text-gray-600">Manage your timetable system with ease.</p>
        </div>

        {/* Features Section */}
        <section className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Manage Courses */}
          <Link href="/admin/courses" className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
           
              <FaBook className="text-4xl text-blue-600" />
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Manage Courses</h3>
              <p className="mt-2 text-gray-600">Add, edit, and delete courses.</p>
            
          </Link>
          {/* Manage Lecturers */}
          <Link href="/admin/lecturers" className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
           
              <FaChalkboardTeacher className="text-4xl text-blue-600" />
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Manage Lecturers</h3>
              <p className="mt-2 text-gray-600">Assign and manage lecturers.</p>
           
          </Link>
          {/* Manage Lecture Halls */}
          <Link href="/admin/halls"  className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
           
              <FaUniversity className="text-4xl text-blue-600" />
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Manage Lecture Halls</h3>
              <p className="mt-2 text-gray-600">Add and manage lecture halls.</p>
            
          </Link>
          {/* Generate Timetables */}
          <Link href="/admin/timetables" className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
           
              <FaCalendarAlt className="text-4xl text-blue-600" />
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Generate Timetables</h3>
              <p className="mt-2 text-gray-600">Create timetables automatically.</p>
          
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Timetable Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
    </AdminLayout>
  )
}
