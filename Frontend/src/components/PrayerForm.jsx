import React, { useState, useEffect } from "react";

const PrayerForm = ({ onSubmit, editingPrayer, onClose }) => {
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        category: "",
        status: "pending",
        answered_at: "",
    });

    useEffect(() => {
        if (editingPrayer) {
            setFormData({
                title: editingPrayer.title || "",
                content: editingPrayer.content || "",
                category: editingPrayer.category || "",
                status: editingPrayer.status || "pending",
                answered_at: editingPrayer.answered_at
                    ? new Date(editingPrayer.answered_at).toISOString().slice(0, 10)
                    : "",
            });
        }
    }, [editingPrayer]);

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
            <div className="bg-[#FFF9F6] rounded-3xl p-6 w-full max-w-2xl shadow-md border border-blush">
                <h2 className="text-xl font-semibold text-[#5C4B47] mb-4 text-center">
                    {editingPrayer ? "Edit Prayer" : "Add New Prayer"} ✨
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label htmlFor="title" className="font-medium text-[#5C4B47]">Title:</label>
                        <input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Title"
                            className="w-full border border-blush bg-rose text-[#5C4B47] p-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C69C8D] transition"
                            required
                        />
                        <label htmlFor="category" className="font-medium text-[#5C4B47]">Category:</label>
                        <input
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            placeholder="Category"
                            className="w-full border border-blush bg-rose text-[#5C4B47] p-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C69C8D] transition"
                        />
                    </div>

                    <label htmlFor="content" className="font-medium text-[#5C4B47]">Content:</label>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        placeholder="Content"
                        className="w-full border border-blush bg-rose text-[#5C4B47] p-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C69C8D] transition"
                        rows={3}
                        required
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <label htmlFor="status" className="font-medium text-[#5C4B47]">Status:</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full border border-blush bg-rose text-[#5C4B47] p-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C69C8D] transition"
                        >
                            <option value="pending">Pending</option>
                            <option value="answered">Answered</option>
                        </select>

                        <label htmlFor="answered_at" className="font-medium text-[#5C4B47]">Answered At:</label>
                        <input
                            type="date"
                            name="answered_at"
                            value={formData.answered_at}
                            onChange={handleChange}
                            className="w-full border border-blush bg-rose text-[#5C4B47] p-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C69C8D] transition"
                        />
                    </div>

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

export default PrayerForm;
