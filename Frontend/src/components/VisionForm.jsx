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
        const { name, value, files } = e.target;
        if (name === "image") {
            // Handle file input separately
            setFormData({ ...formData, image: files[0] || null });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Build a FormData object to send both text + file data
            const formDataToSend = new FormData();
            formDataToSend.append("title", formData.title);
            formDataToSend.append("description", formData.description);
            formDataToSend.append("category", formData.category);
            formDataToSend.append("timeline", formData.timeline);
            if (formData.image) {
                formDataToSend.append("image", formData.image);
            }

            await onSubmit(formDataToSend);
            onClose();
        } catch (error) {
            Swal.fire("Error", "Failed to save vision board", "error");
        }
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

                    <select name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full border border-blush bg-rose text-cocoa placeholder-latte p-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-peach transition">
                        <option value="" disabled>Select Category</option>
                        <option value="personal">Personal growth</option>
                        <option value="career">Career & Purpose</option>
                        <option value="health">Health and Wellness</option>
                        <option value="travel">Travel & Adventure</option>
                        <option value="finance">Finance & Abundance</option>
                        <option value="relationships">Relationships & Love</option>
                        <option value="faith">Faith & Spirituality</option>
                        <option value="lifestyle">Lifestyle & Home</option>
                        <option value="legacy">Legacy & Impact</option>
                        <option value="other">Other</option>
                    </select>
                    {/* File input replaces image_url */}
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                        className="w-full border border-blush bg-rose text-cocoa p-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-peach transition"
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
