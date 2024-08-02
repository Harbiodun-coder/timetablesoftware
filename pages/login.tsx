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

    const loginDetails = {
      email,
      password,
    };

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginDetails),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const { email, role, jwt_token } = data.data;

      localStorage.setItem("timetable-token", jwt_token);

      if (!email || !role) {
        throw new Error("Invalid response data");
      }

      Swal.fire({
        title: "Success",
        text: "Login successful!",
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
        text: "Invalid email or password",
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-center text-3xl font-extrabold text-[#0065C2]">
          Welcome to LASU Timetable System
        </h2>
        <p className="text-center text-gray-500">
          Please log in to access your schedule
        </p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <Input
                name="email"
                type="email"

                placeholder="Email address"
                value={email}
                change={handleChangeEmail} label={""}              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <Input
                name="password"
                type={showPassword ? "text" : "password"}

                placeholder="Password"
                value={password}
                change={handleChangePassword} label={""}              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 "
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <FaEyeSlash className="text-gray-500 cursor-pointer" />
                ) : (
                  <FaEye className="text-gray-500 cursor-pointer" />
                )}
              </div>
            </div>
          </div>
          <div className="w-full mt-4">
            <Button
              intent="primary"
              size="bg"
              text={loading ? "Signing in..." : "Sign in"}
              isLoading={loading}
              type="submit"
            />
          </div>
          <div className="flex justify-center">
            <span className="text-sm">
              Don&#39;t have an account?{" "}
              <Link href="/signup" className="text-blue-700">
                Sign up
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
