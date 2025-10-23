import React, { useEffect, useState } from "react";
import PrayerCard from "../components/PrayerCard";
import PrayerForm from "../components/PrayerForm";
import prayerService from "../services/prayerService";
import { PlusCircle } from "lucide-react";
import Swal from "sweetalert2";

const PrayerPage = () => {
    const [prayers, setPrayers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingPrayer, setEditingPrayer] = useState(null);
    const token = localStorage.getItem("token");

    const fetchPrayers = async () => {
        try {
            const data = await prayerService.getPrayers(token);
            setPrayers(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchPrayers();
    }, []);

    const handleSubmit = async (formData) => {
        try {
            if (editingPrayer) {
                const updated = await prayerService.updatePrayer(editingPrayer.id, formData, token);
                setPrayers(prayers.map(p => p.id === editingPrayer.id ? updated : p));
                setEditingPrayer(null);
            } else {
                const newPrayer = await prayerService.addPrayer(formData, token);
                setPrayers([newPrayer, ...prayers]);
            }
            Swal.fire("Success", "Prayer saved successfully", "success");
            setShowForm(false);
        } catch (err) {
            Swal.fire("Error", "Failed to save prayer", "error");
        }
    };

    const handleEdit = (prayer) => {
        setEditingPrayer(prayer);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Delete this prayer?",
            text: "This cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
        });

        if (confirm.isConfirmed) {
            try {
                await prayerService.deletePrayer(id, token);
                setPrayers(prayers.filter(p => p.id !== id));
                Swal.fire("Deleted!", "Prayer removed.", "success");
            } catch (err) {
                Swal.fire("Error", "Failed to delete prayer", "error");
            }
        }
    };

    return (
        <div className="bg-[#FFF9F6] min-h-screen p-8 text-[#5C4B47]">
            <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-[#6B4B3E] via-[#C69C8D] to-[#C27B7F] bg-clip-text text-transparent drop-shadow-md">
                My Prayers 🙏
            </h1>
            <div className="flex justify-between items-center mb-8">

                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-2 bg-[#C69C8D] hover:bg-[#B2856E] text-white px-4 py-2 rounded-xl transition"
                >
                    <PlusCircle size={20} /> Add Prayer
                </button>
            </div>

            {showForm && (
                <PrayerForm
                    onSubmit={handleSubmit}
                    editingPrayer={editingPrayer}
                    onClose={() => {
                        setShowForm(false);
                        setEditingPrayer(null);
                    }}
                />
            )}

            {prayers.length === 0 ? (
                <p className="text-center mt-10 text-orange-800 text-xl">
                    No prayers yet. Start by adding one ✨
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
                    {prayers.map(prayer => (
                        <PrayerCard
                            key={prayer.id}
                            prayer={prayer}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default PrayerPage;

