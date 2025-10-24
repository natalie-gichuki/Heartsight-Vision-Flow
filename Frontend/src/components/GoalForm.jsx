import React, { useState, useEffect } from "react";

const GoalForm = ({ onSubmit, editingGoal, onClose }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        status: "in_progress",
        progress: 0,
        deadline: "",
        completed_at: "",
    });

    useEffect(() => {
        if (editingGoal) {
            setFormData({
                title: editingGoal.title || "",
                description: editingGoal.description || "",
                category: editingGoal.category || "",
                status: editingGoal.status || "in_progress",
                progress: editingGoal.progress || 0,
                deadline: editingGoal.deadline ? editingGoal.deadline.slice(0, 10) : "",
                completed_at: editingGoal.completed_at ? editingGoal.completed_at.slice(0, 10) : "",
            });
        }
    }, [editingGoal]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="max-h-[90vh] overflow-y-auto bg-[#FFF9F6] rounded-3xl p-6 w-full max-w-2xl shadow-md border border-blush">
                <h2 className="text-xl font-semibold text-[#5C4B47] mb-6 text-center">
                    {editingGoal ? "Edit Goal" : "Add New Goal"} 🌟
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Title and Category */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className="mb-1 font-medium text-[#5C4B47]" htmlFor="title">Title</label>
                            <input
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Title"
                                className="w-full border border-blush bg-rose text-[#5C4B47] p-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C69C8D]"
                                required
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 font-medium text-[#5C4B47]" htmlFor="category">Category</label>
                            <input
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                placeholder="Category"
                                className="w-full border border-blush bg-rose text-[#5C4B47] p-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C69C8D]"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-[#5C4B47]" htmlFor="description">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Description"
                            className="w-full border border-blush bg-rose text-[#5C4B47] p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C69C8D]"
                            rows={4}
                            required
                        />
                    </div>

                    {/* Progress and Status */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className="mb-1 font-medium text-[#5C4B47]" htmlFor="progress">Progress (%)</label>
                            <input
                                type="number"
                                name="progress"
                                value={formData.progress}
                                onChange={handleChange}
                                className="w-full border border-blush bg-rose text-[#5C4B47] p-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C69C8D]"
                                min={0}
                                max={100}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 font-medium text-[#5C4B47]" htmlFor="status">Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full border border-blush bg-rose text-[#5C4B47] p-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C69C8D]"
                            >
                                <option value="in_progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                    </div>

                    {/* Deadline and Completed At */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className="mb-1 font-medium text-[#5C4B47]" htmlFor="deadline">Deadline</label>
                            <input
                                type="date"
                                name="deadline"
                                value={formData.deadline}
                                onChange={handleChange}
                                className="w-full border border-blush bg-rose text-[#5C4B47] p-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C69C8D]"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 font-medium text-[#5C4B47]" htmlFor="completed_at">Completed At</label>
                            <input
                                type="date"
                                name="completed_at"
                                value={formData.completed_at}
                                onChange={handleChange}
                                className="w-full border border-blush bg-rose text-[#5C4B47] p-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C69C8D]"
                            />
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-xl bg-[#B9AFA5] text-white hover:bg-[#5C4B47] transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-xl bg-[#C69C8D] text-white hover:bg-[#B2856E] transition"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default GoalForm;


