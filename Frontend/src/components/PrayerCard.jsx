import React from "react";
import { Pencil, Trash2 } from "lucide-react";

const PrayerCard = ({ prayer, onEdit, onDelete }) => {
    return (
        <div className="bg-rose rounded-xl shadow-sm p-4 flex flex-col justify-between border border-blush hover:shadow-md transition w-80">
            <h3 className="text-2xl font-bold text-[#9C6755]">{prayer.title}</h3>
            <p className="text-[#9C6755] mt-2 text-lg">{prayer.content}</p>
            <p className="text-[#B9AFA5] text-lg mt-2">Category: {prayer.category}</p>
            <p className="text-[#B9AFA5] text-lg mt-1">Status: {prayer.status}</p>
            <p className="text-[#B9AFA5] text-xs mt-1">
                Created: {prayer.created_at ? new Date(prayer.created_at).toLocaleDateString() : "—"}
            </p>
            <p className="text-[#B9AFA5] text-xs mt-1">
                Answered: {prayer.answered_at ? new Date(prayer.answered_at).toLocaleDateString() : "—"}
            </p>

            <div className="flex justify-end gap-2 mt-3">
                <button
                    onClick={() => onEdit(prayer)}
                    className="p-1 rounded bg-[#C69C8D] text-white hover:bg-[#B2856E] transition"
                >
                    <Pencil size={16} />
                </button>
                <button
                    onClick={() => onDelete(prayer.id)}
                    className="p-1 rounded bg-[#C27B7F] text-white hover:bg-[#A45F63] transition"
                >
                    <Trash2 size={16} />
                </button>
            </div>
        </div>
    );
};

export default PrayerCard;

