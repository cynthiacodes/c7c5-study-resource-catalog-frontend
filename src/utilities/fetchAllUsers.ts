import axios from "axios";
import { baseURL } from "./baseURL";

export const fetchAllUsers = async () => {
    try {
        const response = await axios.get(`${baseURL}users`);
        return response.data;
    } catch (error) {
        console.error("error", error);
    }
};
