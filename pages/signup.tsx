import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import Input from "@/components/Input";
import Button from "@/components/Button";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const signupDetails = { email, password, name, role };

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupDetails),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      await response.json(); // You can handle returned data if needed

      Swal.fire({
        title: "Success",
        text: "Signup successful! Please log in with your new account.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        // Redirect to login page
        router.push("/login");
      });
    } catch {
      Swal.fire({
        title: "Error",
        text: "Failed to sign up. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-6 relative overflow-hidden">
        <div className="absolute -top-16 -left-16 w-40 h-40 bg-blue-300 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-indigo-300 rounded-full opacity-30 animate-pulse"></div>

        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Sign Up for LASU Timetable
        </h2>
        <p className="text-center text-gray-500">
          Create an account and start managing your timetable effortlessly
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <Input
            name="name"
            type="text"
            placeholder="Full Name"
            value={name}
            change={(e) => setName(e.target.value)}
            label=""
          />
          <Input
            name="email"
            type="email"
            placeholder="Email address"
            value={email}
            change={(e) => setEmail(e.target.value)}
            label=""
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            change={(e) => setPassword(e.target.value)}
            label=""
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full py-3 px-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-700 text-sm transition-all duration-200 hover:shadow-md"
          >
            <option value="student">Student</option>
            <option value="lecturer">Lecturer</option>
            <option value="admin">Admin</option>
          </select>

          <Button
            intent="primary"
            size="bg"
            text={loading ? "Signing up..." : "Sign Up"}
            isLoading={loading}
            type="submit"
          />

          <div className="text-center text-gray-500 text-sm">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
