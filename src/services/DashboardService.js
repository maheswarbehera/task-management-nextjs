
import axiosInstance from "@/lib/api";


const taskCreatedByUser = async () => {
    try {
        const res = await axiosInstance.get(`/tasks/dashboard`); 
        return res.data;

    } catch (error) {
        console.error("Get tasks error:", error.response?.data || error.message);
        return {
            error: error.response?.data.message || "An error occurred while fetching tasks.",
        };
    }
}
const taskAssigneeToUser = async () => {
    try {
        const res = await axiosInstance.get(`/tasks/dashboard/assign`); 
        return res.data;

    } catch (error) {
        console.error("Get tasks error:", error.response?.data || error.message);
        return {
            error: error.response?.data.message || "An error occurred while fetching tasks.",
        };
    }
}
const overDueTask = async () => {
    try {
        const res = await axiosInstance.get(`/tasks/dashboard/dueTask`); 
        return res.data;

    } catch (error) {
        console.error("Get tasks error:", error.response?.data || error.message);
        return {
            error: error.response?.data.message || "An error occurred while fetching tasks.",
        };
    }
}


export const DashboardService = {
    taskAssigneeToUser,
    taskCreatedByUser,
    overDueTask
}