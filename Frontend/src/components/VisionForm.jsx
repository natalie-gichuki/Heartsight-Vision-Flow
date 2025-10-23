import React, { useState } from "react";
import Swal from "sweetalert2";
import { useEffect } from "react";

const VisionForm = ({ onSubmit, editingVision, onClose }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        image_url: "",
        timeline: "",
    });

    useEffect(() => {
        if (editingVision) {
            setFormData({
                title: editingVision.title || "",
                description: editingVision.description || "",
                category: editingVision.category || "",
                image_url: editingVision.image_url || "",
                timeline: editingVision.timeline || "",
            });
        }
    }, [editingVision]);


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
            <div className="bg-cream rounded-3xl p-6 w-96 shadow-md border border-blush">
                <h2 className="text-xl font-semibold text-cocoa mb-4 text-center">
                    ✨ Add New Vision
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Title"
                        className="w-full border border-blush bg-rose text-cocoa placeholder-latte p-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-peach transition"
                        required
                    />

                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Description"
                        className="w-full border border-blush bg-rose text-cocoa placeholder-latte p-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-peach transition"
                        rows={3}
                    />

                    <input
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        placeholder="Category"
                        className="w-full border border-blush bg-rose text-cocoa placeholder-latte p-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-peach transition"
                    />

                    <input
                        name="image_url"
                        value={formData.image_url}
                        onChange={handleChange}
                        placeholder="Image URL"
                        className="w-full border border-blush bg-rose text-cocoa placeholder-latte p-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-peach transition"
                    />

                    <input
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        placeholder="Timeline (e.g. 2025)"
                        className="w-full border border-blush bg-rose text-cocoa placeholder-latte p-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-peach transition"
                    />

                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-xl bg-latte text-white hover:bg-cocoa transition"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-4 py-2 rounded-xl bg-peach text-white hover:bg-blush transition"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VisionForm;
