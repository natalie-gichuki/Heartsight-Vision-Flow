import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/Slice/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    setMenuOpen(false);
  };

  return (
    <nav className="bg-[#FAF3EF] text-[#6B4B3E] shadow-md border-b border-[#EBD6CC]">
      <div className="flex justify-between items-center px-6 py-4">
        {/* Logo & Menu Button */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="text-2xl font-bold tracking-wide text-[#6B4B3E] hover:text-[#B2856E] transition-all duration-200"
          >
            Heartsight Vision Flow
          </Link>
          <button
            className="md:hidden text-3xl text-[#6B4B3E]"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 text-base font-medium">
          <Link
            to="/"
            className="hover:text-[#B2856E] text-xl transition-all duration-200 hover:underline hover:text-2xl"
          >
            Home
          </Link>
          <Link
            to="/vision"
            className="hover:text-[#B2856E] text-xl transition-all duration-200 hover:underline hover:text-2xl"
          >
            Vision
          </Link>
          <Link
            to="/bucketlist"
            className="hover:text-[#B2856E] text-xl transition-all duration-200 hover:underline hover:text-2xl"
          >
            BucketList
          </Link>
          <Link
            to="/prayers"
            className="hover:text-[#B2856E] text-xl transition-all duration-200 hover:underline hover:text-2xl"
          >
            Prayer
          </Link>
          <Link
            to="/goals"
            className="hover:text-[#B2856E] text-xl transition-all duration-200 hover:underline hover:text-2xl"
          >
            Goals
          </Link>

          {user ? (
            <>
              <span className="italic text-sm opacity-80">{user.username}</span>
              <Link
                to="/profile"
                className="text-2xl hover:text-[#B2856E] transition  1"
              >
                👤
              </Link>
              <button
                onClick={handleLogout}
                className="bg-[#EACFC3] text-[#6B4B3E] font-medium px-4 py-1.5 rounded-full hover:bg-[#E0BBAF] transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-[#EACFC3] text-[#6B4B3E] px-4 py-1.5 rounded-full hover:bg-[#E0BBAF] transition"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-[#C69C8D] text-white px-4 py-1.5 rounded-full hover:bg-[#B2856E] transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-4 px-6 pb-4 text-center bg-[#F9F4F1] text-[#6B4B3E] border-t border-[#EBD6CC] rounded-b-2xl">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="hover:text-[#B2856E]"
          >
            Home
          </Link>
          <Link
            to="/vision"
            onClick={() => setMenuOpen(false)}
            className="hover:text-[#B2856E]"
          >
            Vision
          </Link>
          <Link
            to="/prayers"
            onClick={() => setMenuOpen(false)}
            className="hover:text-[#B2856E]"
          >
            Prayer
          </Link>
          <Link
            to="/goals"
            onClick={() => setMenuOpen(false)}
            className="hover:text-[#B2856E]"
          >
            Goals
          </Link>

          {user ? (
            <>
              <span className="italic">{user.username}</span>
              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className="text-2xl"
              >
                👤
              </Link>
              <button
                onClick={handleLogout}
                className="bg-[#EACFC3] text-[#6B4B3E] px-4 py-1.5 rounded-full hover:bg-[#E0BBAF] transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="bg-[#EACFC3] text-[#6B4B3E] px-4 py-1.5 rounded-full hover:bg-[#E0BBAF] transition"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="bg-[#C69C8D] text-white px-4 py-1.5 rounded-full hover:bg-[#B2856E] transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
