import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/Slice/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Register = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    gender: '',
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
      const result = await dispatch(register(form));
      if (result.meta.requestStatus === 'fulfilled') {
        setForm({ name: '', email: '', password: '', gender: '' });
        navigate('/login');
        Swal.fire({
          icon: 'success',
          title: 'Welcome!',
          text: 'Your account has been created successfully 🎉',
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Registration failed. Please try again.',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF3EF] p-4">
      <div className="bg-white rounded-3xl shadow-md w-full max-w-4xl flex flex-col md:flex-row overflow-hidden">
        {/* Left Side */}
        <div className="hidden md:flex w-1/2 bg-[#EBD6CC] items-center justify-center text-[#5B3A29] p-10">
          <div className="text-center">
            <h2 className="text-3xl font-semibold mb-4">Welcome to VisionFlow 🌸</h2>
            <p className="text-sm opacity-80 leading-relaxed">
              “Faith makes all things possible.”
              <br />
              Begin your journey of vision, prayer, and growth.
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 bg-[#FAF3EF]">
          <h2 className="text-2xl font-bold text-center text-[#7A5C4D] mb-6">
            Create Your Account
          </h2>

          {error && (
            <p className="text-[#D67B6C] text-sm text-center mb-4">{error}</p>
          )}

          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="mb-4">
              <label className="block text-sm text-[#7A5C4D] mb-1">Full Name</label>
              <input
                type="text"
                name="username"
                placeholder="Your full name"
                value={form.username}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#EBCFC2] bg-[#FFF9F7] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#EBCFC2]"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm text-[#7A5C4D] mb-1">Gender</label>
              <select
                id="gender"
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#EBCFC2] bg-[#FFF9F7] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#EBCFC2]"
              >
                <option value="">-- Select Gender --</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm text-[#7A5C4D] mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="youremail@gmail.com"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#EBCFC2] bg-[#FFF9F7] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#EBCFC2]"
                required
                autoComplete='new-email'
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm text-[#7A5C4D] mb-1">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#EBCFC2] bg-[#FFF9F7] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#EBCFC2]"
                required
                autoComplete='new-password'
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#EBCFC2] hover:bg-[#E3B8A8] text-[#5B3A29] font-semibold py-3 rounded-xl transition duration-300 shadow-sm"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Register'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-[#7A5C4D]/80">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-[#C9897B] font-medium hover:underline"
            >
              Sign In
            </Link>
          </div>

          <p className="text-center text-xs text-[#7A5C4D]/50 mt-6">
            © 2025 VisionFlow — Heartsight Project
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
