import axios from "axios";

const API_URL = "http://localhost:8000";

const getAuthConfig = () => ({
    headers: {
        Authorization: `Bearer ${
            localStorage.getItem("access_token") ||
            localStorage.getItem("token")
        }`
    }
});

export const getCurrentUser = async () => {
    const res = await axios.get(
        `${API_URL}/user/me`,
        getAuthConfig()
    );

    return res.data;
};

export const updateProfile = async (data) => {
    const res = await axios.put(
        `${API_URL}/user/update`,
        data,
        getAuthConfig()
    );

    return res.data;
};

export const deleteAccount = async () => {
    const res = await axios.delete(
        `${API_URL}/user/delete`,
        getAuthConfig()
    );

    return res.data;
};

export const updateSettings = async (data) => {
    const res = await axios.put(
        `${API_URL}/user/settings`,
        data,
        getAuthConfig()
    );

    return res.data;
};

export const getSettings = async () => {
    const res = await axios.get(
        `${API_URL}/user/settings`,
        getAuthConfig()
    );

    return res.data;
};


