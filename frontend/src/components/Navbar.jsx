import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, User2 } from "lucide-react";
import { setUser } from "../redux/authSlice";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await fetch("http://localhost:8001/api/v1/user/logout", {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        toast.success(data.message);
        dispatch(setUser(null));
        navigate("/");
      } else {
        throw new Error(data.message || "Logout failed");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4">
        {/* Logo */}
        <a href="http://localhost:3000/" className="flex-shrink-0">
          <h1 className="text-3xl font-bold text-purple-600 animate-bounce">MockView</h1>
        </a>

        {/* Centered Links */}
        <div className="flex-grow flex justify-center">
          <ul className="flex space-x-6 text-gray-700 font-medium">
            <li>
              <Link to="/" className="hover:text-purple-600">Home</Link>
            </li>
            <li>
              <Link to="/speech" className="hover:text-purple-600">Speech Analysis</Link>
            </li>
            <li>
              <Link to="/videoanalysi" className="hover:text-purple-600">Video Analysis</Link>
            </li>
            <li>
              <Link to="/textanalysis" className="hover:text-purple-600">Text Analysis</Link>
            </li>
            <li>
              <Link to="/resume" className="hover:text-purple-600">Resume Builder</Link>
            </li>
          </ul>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          {!user ? (
            <>
              <Link to="/login">
                <button className="border border-purple-600 text-purple-600 px-4 py-2 rounded-md hover:bg-purple-100">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
                  Sign Up
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/profile" className="flex items-center text-purple-600 hover:underline">
                <User2 className="h-5 w-5 mr-1" />
                {user.name}
              </Link>
              <button
                onClick={logoutHandler}
                className="flex items-center text-red-600 hover:underline"
              >
                <LogOut className="h-5 w-5 mr-1" />
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
