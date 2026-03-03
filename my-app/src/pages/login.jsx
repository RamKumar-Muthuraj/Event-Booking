import React, { useState } from "react";
import Form from "../components/ui/Form";
import { useAuth } from "../context/AuthContext";
import { v4 as uuid } from "uuid";

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({});
  const { login, register } = useAuth();

  const LoginFormData = [
    {
      name: "email",
      label: "Email",
      required: true,
      match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      type: "email",
    },
    {
      name: "password",
      label: "Password",
      required: true,
      type: "password",
      match:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    },
  ];

  const RegisterFormData = [
    {
      name: "name",
      label: "Name",
      required: true,
      type: "text",
    },
    {
      name: "email",
      label: "Email",
      required: true,
      match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      type: "email",
    },
    {
      name: "password",
      label: "Password",
      required: true,
      type: "password",
      match:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      required: true,
      type: "password",
      match:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    },
    {
      name: "role",
      label: "Role",
      type: "select",
      required: true,
      options: [
        { label: "User", value: "user" },
        { label: "Admin", value: "admin" },
      ],
    },
  ];

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "user",
    });
  };

  const handleSubmit = () => {
    if (isRegister) {
      register({ id: uuid(), ...formData, role: formData.role || "user" });
      setIsRegister(false);
    } else {
      const isLogin = login(formData);
      if (!isLogin) {
        alert("Invalid credentials");
      }
    }
    resetForm();
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-[35%_65%] min-h-150">
          <div className="hidden md:block relative">
            <img
              src="/EventLogin.jpg"
              alt="Login Visual"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col items-center justify-center px-2 md:px-4 py-3 sm:py-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              {isRegister ? "Create Account" : "Welcome Back"}
            </h2>

            <Form
              fields={isRegister ? RegisterFormData : LoginFormData}
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              direction={
                isRegister ? "grid grid-cols-1 md:grid-cols-2" : "grid-cols-1"
              }
              buttonText={isRegister ? "Create Account" : "Login"}
              size={isRegister ? "max-w-2xl" : "max-w-md"}
              bgColor="bg-(--accent-color)"
            />

            <button
              type="button"
              onClick={() => {
                setIsRegister((prev) => !prev);
                setFormData({});
              }}
              className="mt-6 text-sm font-medium text-cyan-600 hover:text-cyan-500 transition"
            >
              {isRegister
                ? "Already have an account?"
                : "Don't have an account?"}
              <span className="ml-1 underline">
                {isRegister ? "Login" : "Register"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
