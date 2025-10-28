import React, { useState, useEffect } from "react";

const BucketListForm = ({ onSubmit, onClose, existingItem }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        date_added: "",
        achieved_at: "",
        completed: false,
        status: "pending",
    });

    useEffect(() => {
        if (existingItem) setFormData(existingItem);
    }, [existingItem]);

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
            <div className="max-h-[90vh] overflow-y-auto bg-[#FFF9F6] rounded-3xl p-6 w-[600px] shadow-md border border-[#F5DAD2]">
                <h2 className="text-xl font-semibold text-[#9C6755] mb-6 text-center">
                    {existingItem ? "Edit Bucket Item" : "Add New Item"}
                </h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-5">
                    {/* Title */}
                    <div className="col-span-2">
                        <label className="block text-[#5C4B47] text-sm mb-1">Title:</label>
                        <input
                            name="title"
                            onChange={handleChange}
                            value={formData.title}
                            placeholder="Title"
                            className="w-full border border-[#F5DAD2] bg-[#FCEDE6] text-[#5C4B47] placeholder-[#B9AFA5] p-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E7BFB1]"
                            required
                        />
                    </div>

                    {/* Description (takes full width) */}
                    <div className="col-span-2">
                        <label className="block text-[#5C4B47] text-sm mb-1">Description:</label>
                        <textarea
                            name="description"
                            onChange={handleChange}
                            value={formData.description}
                            placeholder="Description"
                            className="w-full border border-[#F5DAD2] bg-[#FCEDE6] text-[#5C4B47] placeholder-[#B9AFA5] p-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E7BFB1]"
                            rows={3}
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-[#5C4B47] text-sm mb-1">Category:</label>
                        <select name='category'
                            onchange={handleChange}
                            value={formData.category}
                            className="w-full border border-[#F5DAD2] bg-[#FCEDE6] text-[#5C4B47] p-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E7BFB1]"
                        >
                            <option value="">Select Category</option>
                            <option value="travel">Travel and Adventure</option>
                            <option value="adventure">Health & Fitness</option>
                            <option value="experience">Career</option>
                            <option value="skill">Finance & Growth</option>
                            <option value="education">Education</option>
                            <option value="spiritual">Spiritual growth</option>
                            <option value="personal">Personal Growth</option>
                            <option value="dreams">Dreams & Aspirations</option>
                            <option value="relationships">Relationships & love</option>
                            <option value="other">Other</option>

                        </select>
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-[#5C4B47] text-sm mb-1">Status:</label>
                        <select
                            name="status"
                            onChange={handleChange}
                            value={formData.status}
                            className="w-full border border-[#F5DAD2] bg-[#FCEDE6] text-[#5C4B47] p-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E7BFB1]"
                        >
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>

                    {/* Date Added */}
                    <div>
                        <label className="block text-[#5C4B47] text-sm mb-1">
                            Date Added:
                        </label>
                        <input
                            type="date"
                            name="date_added"
                            onChange={handleChange}
                            value={formData.date_added}
                            className="w-full border border-[#F5DAD2] bg-[#FCEDE6] text-[#5C4B47] placeholder-[#B9AFA5] p-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E7BFB1]"
                        />
                    </div>

                    {/* Achieved At */}
                    <div>
                        <label className="block text-[#5C4B47] text-sm mb-1">
                            Achieved At:
                        </label>
                        <input
                            type="date"
                            name="achieved_at"
                            onChange={handleChange}
                            value={formData.achieved_at}
                            className="w-full border border-[#F5DAD2] bg-[#FCEDE6] text-[#5C4B47] placeholder-[#B9AFA5] p-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E7BFB1]"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="col-span-2 flex justify-end gap-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-xl bg-[#B9AFA5] text-white hover:bg-[#9C8E88] transition"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-4 py-2 rounded-xl bg-[#E7BFB1] text-white hover:bg-[#F5DAD2] transition"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BucketListForm;

