const API_URL = "https://heartsight-vision-flow-1.onrender.com/goals/goalItems"; // adjust your backend URL

const getGoals = async (token) => {
    const res = await fetch(API_URL, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) throw new Error("Failed to fetch goals");
    return await res.json();
};

const addGoal = async (data, token) => {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Failed to add goal");
    return await res.json();
};

const updateGoal = async (id, data, token) => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Failed to update goal");
    return await res.json();
};

const deleteGoal = async (id, token) => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });

    if (!res.ok) throw new Error("Failed to delete goal");
    return await res.json();
};

export default {
    getGoals,
    addGoal,
    updateGoal,
    deleteGoal,
};
