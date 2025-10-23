import React from "react";
import { Trash2, Edit } from "lucide-react";

const BucketCard = ({ item, onEdit, onDelete }) => {
    return (
        <div className="flex flex-col w-64 bg-[#FFF9F6] rounded-xl shadow-sm border border-[#F5DAD2] overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-200">
            <div className="flex flex-col items-center text-center px-4 py-4">
                <h3 className="text-2xl font-extrabold text-[#9C6755] mb-1">
                    {item.title}
                </h3>
                <p className="text-[#7B6F62] text-lg mb-1">{item.description}</p>
                <p className="text-[#9C6755] text-xl font-bold tracking-wide">
                    {item.category.toUpperCase()}
                </p>
                {item.date_added && (
                    <p className="text-[#B9AFA5] text-xs mt-1">
                        Added: {new Date(item.date_added).toLocaleDateString()}
                    </p>
                )}
                {item.achieved_at && (
                    <p className="text-[#B9AFA5] text-xs">
                        Achieved: {item.achieved_at ? new Date(item.achieved_at).toLocaleDateString() : "—"}
                    </p>

                )}
                <p className="text-[#B9AFA5] text-xs mt-1">Status: {item.status}</p>


                <div className="flex justify-center gap-4 mt-3">
                    <button
                        onClick={() => onEdit(item)}
                        className="text-[#9C6755] hover:text-[#7B4F43] transition"
                    >
                        <Edit size={16} />
                    </button>
                    <button
                        onClick={() => onDelete(item.id)}
                        className="text-[#C96F5A] hover:text-[#9B4B3A] transition"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BucketCard;
