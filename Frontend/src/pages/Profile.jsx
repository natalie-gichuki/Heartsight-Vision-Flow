import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, updateUserProfile } from "../redux/Slice/userSlice";
import { User, Mail, Venus, Pencil, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const Profile = () => {
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector((state) => state.user);

    const [form, setForm] = useState({
        username: "",
        email: "",
        gender: "",
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        dispatch(fetchUserProfile());
    }, [dispatch]);

    useEffect(() => {
        if (user) {
            setForm({
                username: user.username || "",
                email: user.email || "",
                gender: user.gender || "",
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting form data:", form);

        const result = await dispatch(updateUserProfile(form));
        if (result.meta.requestStatus === "fulfilled") {
            Swal.fire({
                title: "Profile Updated!",
                text: "Your profile has been successfully updated 💖",
                icon: "success",
                confirmButtonColor: "#C27B7F",
            });
            setIsEditing(false);
        } else {
            Swal.fire({
                title: "Update Failed",
                text: "Something went wrong. Please try again 😔",
                icon: "error",
                confirmButtonColor: "#f43f5e",
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FFF7F3] px-4 py-8">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-lg w-full max-w-lg overflow-hidden"
            >
                {/* Header */}
                <div className="bg-[#FBE9E1] p-6 text-center">
                    <h2 className="text-3xl font-bold text-[#6B4B3E]">
                        My Profile
                    </h2>
                </div>

                {/* Content */}
                <div className="p-8">
                    {!isEditing ? (
                        <div className="space-y-6">
                            <div>
                                <p className="text-sm text-[#6B4B3E]/80">👩🏽‍💻 Username</p>
                                <p className="text-lg font-medium text-[#6B4B3E]">{user?.username}</p>
                            </div>
                            <div>
                                <p className="text-sm text-[#6B4B3E]/80">📧 Email</p>
                                <p className="text-lg font-medium text-[#6B4B3E]">{user?.email}</p>
                            </div>
                            <div>
                                <p className="text-sm text-[#6B4B3E]/80">🧑‍🤝‍🧑 Gender</p>
                                <p className="text-lg font-medium text-[#6B4B3E]">{user?.gender}</p>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                className="w-full py-3 mt-4 bg-[#C69C8D] hover:bg-[#B2856E] text-white font-semibold rounded-xl transition"
                                onClick={() => setIsEditing(true)}
                            >
                                Edit Profile
                            </motion.button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-[#6B4B3E] mb-1">👩🏽‍💻 Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={form.username}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-[#EBCFC2] focus:ring-2 focus:ring-[#C27B7F] outline-none"
                                    placeholder="Enter username"
                                />
                            </div>
                            <div>
                                <label className="block text-[#6B4B3E] mb-1">📧 Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-[#EBCFC2] focus:ring-2 focus:ring-[#C27B7F] outline-none"
                                    placeholder="Enter email"
                                />
                            </div>
                            <div>
                                <label className="block text-[#6B4B3E] mb-1">🧑‍🤝‍🧑 Gender</label>
                                <select
                                    name="gender"
                                    value={form.gender}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-[#EBCFC2] focus:ring-2 focus:ring-[#C27B7F] outline-none bg-white"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Female">Female</option>
                                    <option value="Male">Male</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <motion.div className="flex space-x-4 mt-4">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    className="flex-1 py-3 bg-[#C69C8D] hover:bg-[#B2856E] text-white font-semibold rounded-xl transition"
                                    type="submit"
                                >
                                    {loading ? "Updating..." : "Save Changes"}
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    className="flex-1 py-3 bg-[#EBD6CC] hover:bg-[#E0BBAF] text-[#6B4B3E] font-semibold rounded-xl transition"
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                >
                                    Cancel
                                </motion.button>
                            </motion.div>
                        </form>
                    )}

                    {error && (
                        <p className="text-center text-[#C27B7F] mt-4">
                            ⚠️ {error}
                        </p>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default Profile;
