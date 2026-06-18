import { useState } from "react";

function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:3001/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    alert("Registration Successful");

    setUser({
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="min-h-screen bg-black flex justify-center items-center">

      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-10 rounded-2xl shadow-2xl w-[400px]"
      >
        <h1 className="text-yellow-500 text-4xl font-bold mb-8 text-center">
          Register
        </h1>

        <input
          type="text"
          name="name"
          value={user.name}
          placeholder="Enter Name"
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-lg bg-gray-800 text-white"
        />

        <input
          type="email"
          name="email"
          value={user.email}
          placeholder="Enter Email"
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-lg bg-gray-800 text-white"
        />

        <input
          type="password"
          name="password"
          value={user.password}
          placeholder="Enter Password"
          onChange={handleChange}
          className="w-full p-3 mb-6 rounded-lg bg-gray-800 text-white"
        />

        <button
          type="submit"
          className="w-full bg-yellow-500 text-black font-bold p-3 rounded-lg hover:scale-105 duration-300"
        >
          Create Account
        </button>

      </form>

    </div>
  );
}

export default Register;