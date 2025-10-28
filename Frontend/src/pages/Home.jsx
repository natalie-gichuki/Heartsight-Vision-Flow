import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, Star, Sparkles, Images } from "lucide-react";
import Tutorial_Video from "../assets/Tutorial_video.mp4";
import React from "react";
// Importing images for the carousel

import BlankPrayerPage from "../assets/prayer-images/Blank-prayer-page.png";
import EmptyPrayerForm from "../assets/prayer-images/Empty-prayer-form.png";
import FilledPrayerForm from "../assets/prayer-images/Filled-prayer-form.png";
import PrayerCard from "../assets/prayer-images/prayer-card.png";
import BlankGoalsForm from "../assets/goals-images/Empty-goals-form.png";
import EmptyGoalsPage from "../assets/goals-images/Empty-goals-page.png";
import FilledGoalsForm from "../assets/goals-images/Filled-goals-form.png";
import GoalsCard from "../assets/goals-images/goal-card.png";

const prayerImages = [BlankPrayerPage, EmptyPrayerForm, FilledPrayerForm, PrayerCard];
const goalsImages = [EmptyGoalsPage, BlankGoalsForm, FilledGoalsForm, GoalsCard];

const HomePage = () => {
    const [current, setCurrent] = React.useState(0);

    const [goalsCurrent, setGoalsCurrent] = React.useState(0);
    console.log(goalsCurrent);

    // Automatically change the image every 4 seconds
    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % prayerImages.length);
            setGoalsCurrent((prev) => (prev + 1) % goalsImages.length);
        }, 4000);

        return () => {
            clearInterval(interval);
        };
    }, [prayerImages.length, goalsImages.length]);


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
                <h1 className="text-6xl pt-20 font-extrabold bg-gradient-to-r from-[#6B4B3E] via-[#C69C8D] to-[#C27B7F] bg-clip-text text-transparent mb-4 drop-shadow-md">
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

            {/* --- Tutorial Section --- */}
            <section className="mt-40 text-center z-10 px-6 w-full">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold text-[#6B4B3E] mb-3"
                >
                    See How VisionFlow Works 🌸
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-[#6B4B3E]/70 text-lg mb-10 max-w-2xl mx-auto"
                >
                    Take a quick tour to discover how VisionFlow helps you nurture your <span className="italic">faith, prayers, and dreams</span> into reality.
                </motion.p>

                {/* Intro Video */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.9 }}
                    viewport={{ once: true }}
                    className="relative aspect-video w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-2xl"
                >
                    <video
                        className="w-full object-cover h-full object-[center_-50px]"
                        controls
                        poster={Tutorial_Video}
                        autoPlay
                        muted
                        loop
                    >
                        <source src={Tutorial_Video} type="video/mp4" />
                    </video>
                </motion.div>
            </section>

            {/* Quote Divider */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1.2 }}
                viewport={{ once: true }}
                className="text-center mt-16 text-[#B2856E] italic text-lg"
            >
                “Faith turns vision into motion.” 🌷
            </motion.div>

            {/* Step-by-Step Pictorial Guide */}
            <section className="mt-20 px-6 max-w-6xl mx-auto text-center mb-32">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold text-[#6B4B3E] mb-6"
                >
                    How It Works ✨
                </motion.h2>

                <section className="flex flex-col md:flex-row items-center justify-center gap-10 mt-20 max-w-6xl mx-auto px-6">
                    {/* === Left: Carousel === */}
                    <div className="relative w-full md:w-1/2 aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl">
                        {prayerImages.map((img, index) => (
                            <motion.img
                                key={index}
                                src={img}
                                alt={`Slide ${index + 1}`}
                                className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: index === current ? 1 : 0 }}
                                transition={{ duration: 1 }}
                            />
                        ))}

                        {/* Dots */}
                        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
                            {prayerImages.map((_, i) => (
                                <div
                                    key={i}
                                    onClick={() => setCurrent(i)}
                                    className={`w-3 h-3 rounded-full cursor-pointer ${i === current ? "bg-[#B2856E]" : "bg-[#C8B6A6]"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* === Right: Explanation === */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center md:text-left md:w-1/2"
                    >
                        <h2 className="text-3xl font-bold text-[#6B4B3E] mb-4">
                            Prayer Section 🌸
                        </h2>
                        <p className="text-[#6B4B3E]/80 text-lg leading-relaxed mb-6">
                            VisionFlow helps you align your spiritual journey and life ambitions.
                            By recording your prayers and intentions, you can create a personalized
                            prayer plan — a roadmap to your dreams and goals.
                        </p>
                        <p className="text-[#6B4B3E]/70 italic mb-4">
                            “Faith is the bridge between your prayers and their manifestation.” 🌷
                        </p>
                        <p className="text-[#6B4B3E]/70 italic">
                            'Prayer is the key to unlocking your potential.' ✨
                        </p>
                    </motion.div>
                </section>

                {/* 🌻 Second Carousel - Inspiration Section */}
                <section className="flex flex-col md:flex-row-reverse items-center justify-center gap-10">
                    {/* Right: Carousel */}
                    <div className="relative w-full md:w-1/2 aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl">
                        {goalsImages.map((img, index) => (
                            <motion.img
                                key={index}
                                src={img}
                                alt={`Inspiration ${index + 1}`}
                                className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: index === goalsCurrent ? 1 : 0 }}
                                transition={{ duration: 1 }}
                            />
                        ))}
                        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
                            {goalsImages.map((_, i) => (
                                <div
                                    key={i}
                                    onClick={() => setGoalsCurrent(i)}
                                    className={`w-3 h-3 rounded-full cursor-pointer ${i === goalsCurrent ? "bg-[#B2856E]" : "bg-[#C8B6A6]"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Left: Description */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center md:text-left md:w-1/2"
                    >
                        <h2 className="text-3xl font-bold text-[#6B4B3E] mb-4">
                            Goals Section 🌻
                        </h2>
                        <p className="text-[#6B4B3E]/80 text-lg leading-relaxed mb-6">
                            VisionFlow empowers you to set, track, and achieve your goals with clarity and purpose.
                            By visualizing your aspirations and breaking them down into actionable steps,
                            you can transform your dreams into reality.
                        </p>
                        <p className="text-[#6B4B3E]/70 italic mb-4">
                            “Your goals are the blueprints of your future.” 🌷
                        </p>
                        <p className="text-[#6B4B3E]/70 italic">
                            "Success is the sum of small efforts, repeated day in and day out." 🌷
                        </p>
                    </motion.div>
                </section>

                {/* CTA Button */}
                <div className="mt-12">
                    <Link
                        to="/register"
                        className="bg-[#C69C8D] hover:bg-[#B2856E] text-white font-semibold px-8 py-3 rounded-2xl shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1"
                    >
                        Start Your Journey
                    </Link>
                </div>
            </section>


            <footer className="absolute bottom-6 text-[#6B4B3E]/60 text-sm">
                © {new Date().getFullYear()} VisionFlow — Heartsight Project 🌷
            </footer>
        </div>
    );
};

export default HomePage;


