import React from "react";
import { Trash2, Edit } from "lucide-react";

const VisionCard = ({ vision, onEdit, onDelete }) => {
    return (
        <div className="flex flex-col w-64 bg-[#FFF9F6] rounded-xl shadow-sm border border-[#F5DAD2] overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-200">
            {/* Image */}
            <img
                src={vision.image_url || "https://via.placeholder.com/300x200?text=Vision"}
                alt={vision.title}
                className="w-full h-80 object-cover"
            />

            {/* Content */}
            <div className="flex flex-col items-center text-center px-4 py-3">
                <h3 className="text-lg font-extrabold text-[#9C6755] mb-1">
                    {vision.title || "Untitled"}
                </h3>
                {vision.description && (
                    <p className="text-[#7B6F62] text-sm mb-1">{vision.description}</p>
                )}
                {vision.category && (
                    <p className="text-[#9C6755] text-sm font-semibold tracking-wide">
                        {vision.category.toUpperCase()}
                    </p>
                )}
                {vision.timeline && (
                    <p className="text-[#B9AFA5] text-xs mt-1">Timeline: {vision.timeline}</p>
                )}

                {/* Actions */}
                <div className="flex justify-center gap-4 mt-3">
                    <button
                        onClick={() => onEdit(vision.id)}
                        className="text-[#9C6755] hover:text-[#7B4F43] transition"
                        title="Edit"
                    >
                        <Edit size={16} />
                    </button>
                    <button
                        onClick={() => onDelete(vision.id)}
                        className="text-[#C96F5A] hover:text-[#9B4B3A] transition"
                        title="Delete"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VisionCard;
