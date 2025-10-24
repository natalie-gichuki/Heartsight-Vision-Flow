import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, Star, Sparkles } from "lucide-react";

export default function HomePage() {
    return (
        <div className="relative min-h-screen bg-gradient-to-br from-[#FAF3EF] via-[#FBEFEA] to-[#EBD6CC] flex flex-col items-center justify-center overflow-hidden px-6">

            {/* Floating icons for animation */}
            <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 6 }}
                className="absolute top-20 left-12 text-[#C69C8D]"
            >
                <Heart size={38} />
            </motion.div>
            <motion.div
                animate={{ y: [0, -25, 0] }}
                transition={{ repeat: Infinity, duration: 8 }}
                className="absolute bottom-28 right-16 text-[#C27B7F]"
            >
                <Star size={38} />
            </motion.div>
            <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 7 }}
                className="absolute top-1/3 right-1/3 text-[#B2856E]"
            >
                <Sparkles size={38} />
            </motion.div>

            {/* Main content */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="z-10 text-center"
            >
                <h1 className="text-6xl font-extrabold bg-gradient-to-r from-[#6B4B3E] via-[#C69C8D] to-[#C27B7F] bg-clip-text text-transparent mb-4 drop-shadow-md">
                    VisionFlow 🌸
                </h1>
                <p className="text-[#6B4B3E]/80 text-lg sm:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
                    Where <span className="italic">faith meets vision</span> —
                    nurture your prayers, dreams, and goals with love and light ✨
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-5">
                    <Link
                        to="/register"
                        className="bg-[#C69C8D] hover:bg-[#B2856E] text-white font-semibold px-8 py-3 rounded-2xl shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1"
                    >
                        Get Started
                    </Link>
                    <Link
                        to="/login"
                        className="border border-[#C69C8D] text-[#6B4B3E] hover:bg-[#FAF3EF]/70 px-8 py-3 rounded-2xl shadow-md font-medium transition-all"
                    >
                        Log In
                    </Link>
                </div>
            </motion.div>

            {/* Decorative glow circles */}
            <div className="absolute top-40 left-32 w-64 h-64 bg-[#EBD6CC]/40 rounded-full blur-3xl"></div>
            <div className="absolute bottom-40 right-32 w-72 h-72 bg-[#C69C8D]/30 rounded-full blur-3xl"></div>

            <footer className="absolute bottom-6 text-[#6B4B3E]/60 text-sm">
                © {new Date().getFullYear()} VisionFlow — Heartsight Project 🌷
            </footer>
        </div>
    );
}



