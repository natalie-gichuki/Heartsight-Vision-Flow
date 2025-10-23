import React, { useEffect, useState } from "react";
import bucketListService from "../services/bucketListService";
import BucketCard from "../components/BucketCard";
import BucketListForm from "../components/BucketListForm";
import { PlusCircle } from "lucide-react";
import Swal from "sweetalert2";

const BucketList = () => {
    const [items, setItems] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const data = await bucketListService.getItems(token);
                setItems(data);
            } catch (err) {
                console.error("Error fetching bucket list:", err);
            }
        };
        fetchItems();
    }, [token]);

    const handleAdd = async (formData) => {
        try {
            const newItem = await bucketListService.addItem(formData, token);
            setItems([newItem, ...items]);
            Swal.fire("Added!", "New bucket list item added successfully.", "success");
        } catch {
            Swal.fire("Error", "Failed to add item.", "error");
        }
    };

    const handleEdit = async (formData) => {
        try {
            const updated = await bucketListService.updateItem(editItem.id, formData, token);
            setItems(items.map((i) => (i.id === editItem.id ? updated : i)));
            Swal.fire("Updated!", "Item updated successfully.", "success");
        } catch {
            Swal.fire("Error", "Failed to update item.", "error");
        } finally {
            setEditItem(null);
        }
    };

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Delete this item?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
        });

        if (confirm.isConfirmed) {
            try {
                await bucketListService.deleteItem(id, token);
                setItems(items.filter((i) => i.id !== id));
                Swal.fire("Deleted!", "Item removed successfully.", "success");
            } catch {
                Swal.fire("Error", "Failed to delete item.", "error");
            }
        }
    };

    return (
        <div className="bg-[#FFF9F6] min-h-screen p-8 text-[#5C4B47]">
            <h1 className="text-center text-3xl font-extrabold bg-gradient-to-r from-[#6B4B3E] via-[#C69C8D] to-[#C27B7F] bg-clip-text text-transparent mb-4 drop-shadow-md">My Bucket List 🌟</h1>
            <div className="flex justify-between items-center mb-8">

                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-2 bg-[#C69C8D] hover:bg-[#B2856E] text-white px-4 py-2 rounded-xl transition"
                >
                    <PlusCircle size={20} /> Add Item
                </button>
            </div>

            {showForm && (
                <BucketListForm
                    onSubmit={editItem ? handleEdit : handleAdd}
                    onClose={() => {
                        setShowForm(false);
                        setEditItem(null);
                    }}
                    existingItem={editItem}
                />
            )}

            {items.length === 0 ? (
                <p className="text-center mt-10  text-orange-800 text-xl">
                    Your bucket list is empty. Start by adding something inspiring ✨
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
                    {items.map((item) => (
                        <BucketCard
                            key={item.id}
                            item={item}
                            onEdit={(i) => {
                                setEditItem(i);
                                setShowForm(true);
                            }}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default BucketList;
