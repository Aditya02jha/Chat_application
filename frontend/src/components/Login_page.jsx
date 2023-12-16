import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
// import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    if (localStorage.getItem("chat-app-current-use")) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
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
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            LOGIN
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

// const FormContainer = styled.div`
//   height: 100vh;
//   width: 100vw;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   gap: 1rem;
//   align-items: center;
//   background-color: #131324;
//   .brand {
//     display: flex;
//     align-items: center;
//     gap: 1rem;
//     justify-content: center;
//     img {
//       height: 5rem;
//     }
//     h1 {
//       color: white;
//       text-transform: uppercase;
//     }
//   }

//   form {
//     display: flex;
//     flex-direction: column;
//     gap: 2rem;
//     background-color: #00000076;
//     border-radius: 2rem;
//     padding: 5rem;
//   }
//   input {
//     background-color: transparent;
//     padding: 1rem;
//     border: 0.1rem solid #4e0eff;
//     border-radius: 0.4rem;
//     color: white;
//     width: 100%;
//     font-size: 1rem;
//     &:focus {
//       border: 0.1rem solid #997af0;
//       outline: none;
//     }
//   }
//   button {
//     background-color: #4e0eff;
//     color: white;
//     padding: 1rem 2rem;
//     border: none;
//     font-weight: bold;
//     cursor: pointer;
//     border-radius: 0.4rem;
//     font-size: 1rem;
//     text-transform: uppercase;
//     &:hover {
//       background-color: #4e0eff;
//     }
//   }
//   span {
//     color: white;
//     text-transform: uppercase;
//     a {
//       color: #4e0eff;
//       text-decoration: none;
//       font-weight: bold;
//     }
//   }
// `;