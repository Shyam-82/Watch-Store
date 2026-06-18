import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch(
      "http://localhost:3001/users"
    );

    const users = await res.json();

    const user = users.find(
      (u) =>
        u.email === email &&
        u.password === password
    );

    if (user) {
      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      alert("Login Successful");

      navigate("/");
    } else {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="min-h-screen bg-black flex justify-center items-center">

      <form
        onSubmit={handleLogin}
        className="bg-gray-900 p-10 rounded-2xl shadow-2xl w-[400px]"
      >
        <h1 className="text-yellow-500 text-4xl font-bold mb-8 text-center">
          Login
        </h1>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full p-3 mb-4 rounded-lg bg-gray-800 text-white"
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full p-3 mb-6 rounded-lg bg-gray-800 text-white"
        />

        <button
          type="submit"
          className="w-full bg-yellow-500 text-black font-bold p-3 rounded-lg hover:scale-105 duration-300"
        >
          Login
        </button>

      </form>

    </div>
  );
}

export default Login;