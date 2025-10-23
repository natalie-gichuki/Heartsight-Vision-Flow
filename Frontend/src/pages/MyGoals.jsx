import React, { useEffect, useState } from "react";
import GoalCard from "../components/GoalCard";
import GoalForm from "../components/GoalForm";
import goalService from "../services/goalService"; // Axios or fetch service
import { PlusCircle } from "lucide-react";
import Swal from "sweetalert2";

const GoalPage = () => {
    const [goals, setGoals] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingGoal, setEditingGoal] = useState(null);
    const token = localStorage.getItem("token");

    const fetchGoals = async () => {
        try {
            const data = await goalService.getGoals(token);
            setGoals(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchGoals();
    }, []);

    const handleSubmit = async (formData) => {
        try {
            if (editingGoal) {
                const updated = await goalService.updateGoal(editingGoal.id, formData, token);
                setGoals(goals.map((g) => (g.id === editingGoal.id ? { ...g, ...formData } : g)));
                setEditingGoal(null);
            } else {
                const newGoal = await goalService.addGoal(formData, token);
                setGoals([newGoal, ...goals]);
            }
            Swal.fire("Success", "Goal saved successfully", "success");
        } catch (err) {
            Swal.fire("Error", "Failed to save goal", "error");
        } finally {
            setShowForm(false);
        }
    };

    const handleEdit = (goal) => {
        setEditingGoal(goal);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Delete this goal?",
            text: "This cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
        });

        if (confirm.isConfirmed) {
            try {
                await goalService.deleteGoal(id, token);
                setGoals(goals.filter((g) => g.id !== id));
                Swal.fire("Deleted!", "Goal removed.", "success");
            } catch {
                Swal.fire("Error", "Failed to delete goal", "error");
            }
        }
    };

    return (
        <div className="p-6 bg-[#FFF9F6] min-h-screen text-[#5C4B47]">
            <h1 className="text-4xl font-extrabold text-center mb-4 bg-gradient-to-r from-[#6B4B3E] via-[#C69C8D] to-[#C27B7F] bg-clip-text text-transparent drop-shadow-md">My Goals 🌟</h1>
            <div className="flex justify-between items-center mb-6">

                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-2 bg-[#C69C8D] text-white px-4 py-2 rounded-xl hover:bg-[#B2856E] transition"
                >
                    <PlusCircle size={20} /> Add Goal
                </button>
            </div>

            {showForm && (
                <GoalForm
                    onSubmit={handleSubmit}
                    editingGoal={editingGoal}
                    onClose={() => {
                        setShowForm(false);
                        setEditingGoal(null);
                    }}
                />
            )}

            {goals.length === 0 ? (
                <p className="text-center mt-10 text-orange-800 text-xl">
                    You haven't added any goals yet. Start now! ✨
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {goals.map((goal) => (
                        <GoalCard
                            key={goal.id}
                            goal={goal}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default GoalPage;
