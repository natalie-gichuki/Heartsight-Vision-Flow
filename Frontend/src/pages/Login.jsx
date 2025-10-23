import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/Slice/authSlice";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(login(form));
      if (result.meta.requestStatus === "fulfilled") {
        Swal.fire({
          icon: "success",
          title: "Welcome Back 🌸",
          text: "Login successful!",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate("/");
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid email or password. Please try again.",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF3EF] p-4">
      <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-lg w-full max-w-4xl flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Section */}
        <div className="hidden md:flex w-1/2 bg-[#EBD6CC] items-center justify-center text-[#6B4B3E] text-center p-10">
          <div>
            <h2 className="text-4xl font-bold mb-4">Welcome Back 🌷</h2>
            <p className="text-lg opacity-90 leading-relaxed">
              Step back into your journey of <br />
              <span className="italic font-medium">faith, vision & growth.</span>
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 bg-[#FAF3EF]">
          <h2 className="text-3xl font-bold text-center text-[#6B4B3E] mb-6">
            Sign In
          </h2>

          {error && (
            <p className="text-[#C27B7F] text-sm text-center mb-4">{error}</p>
          )}

          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="mb-5">
              <label className="block text-sm text-[#6B4B3E] mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="youremail@gmail.com"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#E0BBAF] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C69C8D] bg-white/70"
                required
                autoComplete="new-email"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm text-[#6B4B3E] mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#E0BBAF] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C69C8D] bg-white/70"
                required
                autoComplete="new-password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#C69C8D] hover:bg-[#B2856E] text-white font-medium py-3 rounded-xl transition duration-300 shadow-md"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-[#6B4B3E]/80">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-[#C27B7F] font-medium hover:underline"
            >
              Register
            </Link>
          </div>

          <p className="text-center text-xs text-[#6B4B3E]/50 mt-6">
            © 2025 VisionFlow — Guided by Faith
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
