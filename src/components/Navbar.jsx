import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-black text-white px-8 py-4 flex justify-between items-center border-b border-gray-800">

      <h1 className="text-2xl font-bold text-yellow-500">
        LUXWATCH
      </h1>

      <div className="flex gap-6">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/wishlist">Wishlist</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>

      <button
        onClick={logout}
        className="bg-yellow-500 text-black px-4 py-2 rounded"
      >
        Logout
      </button>

    </nav>
  );
}

export default Navbar;