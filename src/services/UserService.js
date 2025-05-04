import axiosInstance from "@/lib/api";


const getAll = async () => {
    try {
        const res = await axiosInstance.get(`/users`); 
        console.log(res.data)
        return res.data;

    } catch (error) {
        console.error("Get tasks error:", error.response?.data || error.message);
        return {
            error: error.response?.data.message || "An error occurred while fetching tasks.",
        };
    }
}

export const UserService = {
    getAll
}