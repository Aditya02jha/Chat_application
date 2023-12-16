import { useEffect, useState, useRef } from "react";
import React from "react";


const Login_page = () => {
  const [value, setValue] = useState({
    username: "",
    password: "",
  });

  const usernameInputRef = useRef(null);
  useEffect(() => {
    usernameInputRef.current.focus();
  }, []);

  function handleChange(e) {
    setValue({ ...value, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-magenta-500 to-blue-500">
      <div className="bg-white p-8 rounded-md shadow-md w-96">
        <form onSubmit={handleSubmit}>
          <label className="block text-gray-700">UserName</label>
          <input
            type="text"
            name="username"
            required
            onChange={handleChange}
            ref={usernameInputRef}
            className="mt-1 p-2 w-full border rounded-md"
          />

          <label className="block text-gray-700 mt-4">Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            className="mt-1 p-2 w-full border rounded-md"
          />
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login_page;
