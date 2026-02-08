import axios from "axios";

// Access the backend URL from environment variables or default to localhost
const API_URL = "http://localhost:8000/api/ai";

const getHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

export const fetchAISuggestions = async (text: string) => {
    try {
        const response = await axios.post(
            `${API_URL}/suggest`,
            { text },
            getHeaders()
        );
        return response.data.suggestion;
    } catch (error) {
        console.error("Error fetching AI suggestions:", error);
        throw error;
    }
};

/* ===========================
   CHAT API
   =========================== */

export const getChats = async () => {
    const response = await axios.get(`${API_URL}/chats`, getHeaders());
    return response.data;
};

export const getChatHistory = async (id: string) => {
    const response = await axios.get(`${API_URL}/chats/${id}`, getHeaders());
    return response.data;
};

export const createChat = async (message: string, context?: any) => {
    const response = await axios.post(
        `${API_URL}/chats`,
        { message, context },
        getHeaders()
    );
    return response.data;
};

export const sendMessage = async (id: string, message: string, context?: any) => {
    const response = await axios.post(
        `${API_URL}/chats/${id}/message`,
        { message, context },
        getHeaders()
    );
    return response.data;
};

export const deleteChat = async (id: string) => {
    await axios.delete(`${API_URL}/chats/${id}`, getHeaders());
};
