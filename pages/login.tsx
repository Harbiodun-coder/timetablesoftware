import React, { useState, ChangeEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Input from "@/components/Input";
import Button from "@/components/Button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const loginDetails = { email, password };

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginDetails),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      const { role, jwt_token } = data.data;

      localStorage.setItem("timetable-token", jwt_token);

      Swal.fire({
        title: "Success",
        text: "Login successful!",
        icon: "success",
        confirmButtonText: "OK",
      });

      if (role === "admin") router.push("/admin");
      else if (role === "lecturer") router.push("/lecturer");
      else router.push("/student/timetable");
    } catch {
      Swal.fire({
        title: "Error",
        text: "Invalid email or password",
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
        {/* Decorative circles */}
        <div className="absolute -top-16 -left-16 w-40 h-40 bg-blue-300 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-indigo-300 rounded-full opacity-30 animate-pulse"></div>

        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Welcome to LASU Timetable
        </h2>
        <p className="text-center text-gray-500">
          Log in to access your schedule and manage your classes
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <Input
            name="email"
            type="email"
            placeholder="Email address"
            value={email}
            change={(e) => setEmail(e.target.value)}
            label=""
          />
          <div className="relative">
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              change={(e) => setPassword(e.target.value)}
              label=""
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FaEyeSlash className="text-gray-500 hover:text-gray-700 transition-colors" />
              ) : (
                <FaEye className="text-gray-500 hover:text-gray-700 transition-colors" />
              )}
            </div>
          </div>

          <Button
            intent="primary"
            size="bg"
            text={loading ? "Signing in..." : "Sign In"}
            isLoading={loading}
            type="submit"
          />

          <div className="text-center text-gray-500 text-sm">
            Don’t have an account?{" "}
            <Link
              href="/signup"
              className="text-blue-600 font-semibold hover:underline"
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
