import axiosInstance from "@/lib/api";


const getAll = async () => {
    try {
        const res = await axiosInstance.get(`/tasks`); 
        return res.data;

    } catch (error) {
        console.error("Get tasks error:", error.response?.data || error.message);
        return {
            error: error.response?.data.message || "An error occurred while fetching tasks.",
        };
    }
}

const getById  = async(id) =>{
    try {
        const res = await axiosInstance.get(`/tasks/id/${id}`); 
        return res.data;

    } catch (error) {
        console.error("Get tasks error:", error.response?.data || error.message);
        return {
            error: error.response?.data.message || "An error occurred while fetching tasks.",
        };
    }
}

const taskCreate = async (task) =>{
    try {
        const res = await axiosInstance.post(`/tasks/create`, task);
        console.log(res.data)
        return res.data;

    } catch (error) {
        console.error("create task error:", error.response?.data || error.message);
        return {
            error: error.response?.data.message || "An error occurred while fetching tasks.",
        };
    }
}

const updateTask = async(id, task)=> {
    try {
        const res = await axiosInstance.put(`/tasks/id/${id}`, task);
        console.log(res.data)
        return res.data;
    } catch (error) {
        console.error("update task error:", error.response?.data || error.message);
        return {
            error: error.response?.data.message || "An error occurred while fetching tasks.",
        };
    }
}

const deleteTask = async (id) => {
    try {
        const res = await axiosInstance.delete(`/tasks/id/${id}`); 
        return res.data;
    } catch (error) {
        console.error("Delete task error:", error.response?.data.message || error.message);
        return {
            error: error.response?.data.message || "An error occurred while deleting the task.",
        };
    }
}

const searchTask = async (query) => {
    try {
        const res = await axiosInstance.get(`/tasks/search?query=${query}`); 
        return res.data;
    } catch (error) {
        console.error("Delete task error:", error.response?.data.message || error.message);
        return {
            error: error.response?.data.message || "An error occurred.",
        };
    }
}
const filterTask = async (query) => {
    try {
        const res = await axiosInstance.get(`/tasks/filter?${query}`); 
        return res.data;
    } catch (error) {
        console.error("Delete task error:", error.response?.data.message || error.message);
        return {
            error: error.response?.data.message || "An error occurred.",
        };
    }
}

export const TaskService = {
    getAll,
    getById,
    taskCreate,
    deleteTask,
    updateTask,
    searchTask,
    filterTask
};
