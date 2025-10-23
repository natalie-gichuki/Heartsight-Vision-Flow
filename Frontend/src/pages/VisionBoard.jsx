import React, { useEffect, useState } from "react";
import visionService from "../services/visionBoardService";
import VisionCard from "../components/VisionCard";
import VisionForm from "../components/VisionForm";
import { PlusCircle } from "lucide-react";
import Swal from "sweetalert2";

const Visions = () => {
    const [visions, setVisions] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchVisions = async () => {
            try {
                const data = await visionService.getVisions(token);
                setVisions(data);
            } catch (err) {
                console.error("Error fetching visions:", err);
            }
        };
        fetchVisions();
    }, [token]);

    const handleAddVision = async (formData) => {
        try {
            const newVision = await visionService.createVision(formData, token);
            setVisions([newVision, ...visions]);
            Swal.fire("Success", "Vision added successfully", "success");
        } catch (err) {
            Swal.fire("Error", "Failed to add vision", "error");
        }
    };

    const [editingVision, setEditingVision] = useState(null);
    // Open form to edit
    const handleEdit = (vision) => {
        setEditingVision(vision);
        setShowForm(true);
    };

    // Submit (create or update)
    const handleSubmit = async (formData) => {
        if (editingVision) {
            await visionService.updateVision(editingVision.id, formData, token);
            setVisions(visions.map(v => v.id === editingVision.id ? { ...v, ...formData } : v));
            setEditingVision(null);
        } else {
            const newVision = await visionService.createVision(formData, token);
            setVisions([newVision, ...visions]);
        }
    };


    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Delete this vision?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            confirmButtonColor: "#E7BFB1",
            cancelButtonColor: "#9C8E88",
        });

        if (confirm.isConfirmed) {
            try {
                await visionService.deleteVision(id, token);
                setVisions(visions.filter((v) => v.id !== id));
                Swal.fire("Deleted!", "Vision removed successfully.", "success");
            } catch (err) {
                Swal.fire("Error", "Failed to delete vision", "error");
            }
        }
    };

    return (
        <div className="p-6 bg-cream min-h-screen text-cocoa bg-[#FAF3EF]">
            <h1 className="text-center text-4xl font-extrabold bg-gradient-to-r from-[#6B4B3E] via-[#C69C8D] to-[#C27B7F] bg-clip-text text-transparent mb-4 drop-shadow-md">My Vision Board</h1>
            <div className="flex justify-between items-center mb-6">

                <button
                    onClick={() => setShowForm(true)}
                    className="bg-[#C69C8D] hover:bg-[#B2856E] flex items-center gap-2 bg-peach text-white px-4 py-2 rounded-xl hover:bg-blush transition-colors shadow-sm"
                >
                    <PlusCircle size={20} /> Add Vision
                </button>
            </div>

            {showForm && (
                <VisionForm onSubmit={handleSubmit} editingVision={editingVision} onClose={() => {
                    setShowForm(false);
                    setEditingVision(null);
                }} />
            )}

            {visions.length === 0 ? (
                <p className="text-latte mt-10 text-center text-orange-800 text-xl">
                    No visions yet. Start by adding one! ✨
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {visions.map((vision) => (
                        <div
                            key={vision.id}
                            className="bg-rose rounded-xl shadow-sm p-4 flex flex-col items-center justify-center text-center border border-blush hover:shadow-md transition"
                        >
                            <VisionCard vision={vision} onDelete={handleDelete} onEdit={handleEdit} key={vision.id} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Visions;

