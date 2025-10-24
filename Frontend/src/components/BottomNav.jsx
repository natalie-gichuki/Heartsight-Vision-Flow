import { Link, useLocation } from "react-router-dom";
import { Home, Heart, Target, BookOpen, ListChecks } from "lucide-react"; // icons

const BottomNav = () => {
    const location = useLocation();

    const navItems = [
        { path: "/", label: "Home", icon: <Home size={22} /> },
        { path: "/vision", label: "Vision", icon: <Target size={22} /> },
        { path: "/prayers", label: "Prayer", icon: <Heart size={22} /> },
        { path: "/goals", label: "Goals", icon: <BookOpen size={22} /> },
        { path: "/bucketlist", label: "Bucket List", icon: <ListChecks size={22} /> },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-[#FAF3EF] border-t border-[#EBD6CC] text-[#6B4B3E] flex justify-around items-center py-2 md:hidden shadow-[0_-1px_6px_rgba(0,0,0,0.1)] rounded-t-2xl">
            {navItems.map((item) => (
                <Link
                    key={item.path}
                    to={item.path}
                    className={`flex flex-col items-center text-xs ${location.pathname === item.path ? "text-[#B2856E] font-semibold" : ""
                        }`}
                >
                    {item.icon}
                    <span>{item.label}</span>
                </Link>
            ))}
        </div>
    );
};

export default BottomNav;
