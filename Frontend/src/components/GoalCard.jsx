import React from "react";
import { Pencil, Trash2 } from "lucide-react";

const GoalCard = ({ goal, onEdit, onDelete }) => {
    return (
        <div className="bg-white rounded-xl shadow-md p-4 flex flex-col justify-between border border-blush hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold text-[#9C6755]"> ~ {goal.title}</h3>
            <p className="text-[#9C6755] mt-2 text-xl"> {goal.description}</p>
            <p className="text-[#B9AFA5] text-lg mt-2">Category: {goal.category}</p>
            <p className="text-[#B9AFA5] text-lg mt-1">Status: {goal.status}</p>
            <div className="mt-2">
                <label className="text-[#5C4B47] text-sm font-medium">Progress: {goal.progress}%</label>
                <div className="w-full h-3 bg-[#c5c0ba] rounded-xl overflow-hidden mt-1">
                    <div
                        className="h-3 rounded-xl bg-[#9e7d71] transition-all duration-500"
                        style={{ width: `${goal.progress}%` }}
                    ></div>
                </div>
            </div>

            <p className="text-[#B9AFA5] text-xs mt-1">
                Deadline: {goal.deadline ? new Date(goal.deadline).toLocaleDateString() : "—"}
            </p>
            <p className="text-[#B9AFA5] text-xs mt-1">
                Completed: {goal.completed_at ? new Date(goal.completed_at).toLocaleDateString() : "—"}
            </p>

            <div className="flex justify-end gap-2 mt-3">
                <button
                    onClick={() => onEdit(goal)}
                    className="p-1 rounded bg-[#C69C8D] text-white hover:bg-[#B2856E] transition"
                >
                    <Pencil size={16} />
                </button>
                <button
                    onClick={() => onDelete(goal.id)}
                    className="p-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
                >
                    <Trash2 size={16} />
                </button>
            </div>
        </div>
    );
};

export default GoalCard;
