import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";

export default function Register() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [values, setValues] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (localStorage.getItem("chat-app-current-user")) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { username , password , confirmPassword } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { username, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          "chat-app-current-user",
          JSON.stringify(data.user)
        );
        navigate("/");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-magenta-500 to-blue-500">
      <div className="bg-white p-8 rounded-md shadow-md w-96">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <form onSubmit={handleSubmit}>
          <label className="block text-gray-700">UserName</label>
          <input
            type="text"
            name="username"
            required
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />

          <label className="block text-gray-700 mt-4">Password</label>
          <input
            type="password"
            name="password"
            required
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />

          <label className="block text-gray-700 mt-4">Confirm Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="confirmPassword"
            className="mt-1 p-2 w-full border rounded-md"
          />

          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Sign Up
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

