import axiosInstance from "@/lib/api";

const UserLogin = async(data) => {
    try {
        const res = await axiosInstance.post(`/users/login`, data);  
        return res.data;
    } catch (error) {
        console.error("Get tasks error:", error.response?.data || error.message);
        return {
            error: error.response?.data.message || "An error occurred while fetching tasks.",
        };
    }
}
const UserSignup = async(data) => {
    try {
        const res = await axiosInstance.post(`/users/signup`, data);  
        return res.data;
    } catch (error) {
        console.error("Get tasks error:", error.response?.data || error.message);
        return {
            error: error.response?.data.message || "An error occurred while fetching tasks.",
        };
    }
}

const getAll = async () => {
    try {
        const res = await axiosInstance.get(`/users`);  
        return res.data;

    } catch (error) {
        console.error("Get tasks error:", error.response?.data || error.message);
        return {
            error: error.response?.data.message || "An error occurred while fetching tasks.",
        };
    }
}

export const UserService = {
    getAll,
    UserLogin,
    UserSignup
}