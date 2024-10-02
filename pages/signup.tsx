import React, { useState, ChangeEvent } from "react";
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

    const signupDetails = {
      email,
      password,
      name,
      role,
    };

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupDetails),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const { email, role, jwt_token } = data.data;

      localStorage.setItem("timetable-token", jwt_token);

      Swal.fire({
        title: "Success",
        text: "Signup successful!",
        icon: "success",
        confirmButtonText: "OK",
      });

      if (role === "admin") {
        router.push("/admin");
      } else if (role === "lecturer") {
        router.push("/lecturer");
      } else if (role === "student") {
        router.push("/student/timetable");
      } else {
        Swal.fire({
          title: "Error",
          text: "Unknown user role",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
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

  const handleChangeEmail = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setPassword(e.target.value);
  };

  const handleChangeName = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setName(e.target.value);
  };

  const handleChangeRole = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setRole(e.target.value);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-center text-3xl font-extrabold text-[#0065C2]">
          Sign Up for LASU Timetable System
        </h2>
        <p className="text-center text-gray-500">
          Please fill in the details to create your account
        </p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <Input
                name="name"
                type="text"
                placeholder="Name"
                value={name}
                change={handleChangeName}
                label={""}
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <Input
                name="email"
                type="email"
                placeholder="Email address"
                value={email}
                change={handleChangeEmail}
                label={""}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <Input
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                change={handleChangePassword}
                label={""}
              />
            </div>
            <div>
              <label htmlFor="role" className="sr-only">
                Role
              </label>
              <select
                id="role"
                name="role"
                required
                value={role}
                onChange={handleChangeRole}
                className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              >
                <option value="student">Student</option>
                <option value="lecturer">Lecturer</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          <div className="w-full mt-4">
            <Button
              intent="primary"
              size="bg"
              text={loading ? "Signing up..." : "Sign up"}
              isLoading={loading}
              type="submit"
            />
          </div>
          <div className="flex justify-center">
            <span className="text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-700">
                Log in
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
