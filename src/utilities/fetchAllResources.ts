import axios from "axios";
import { baseURL } from "./baseURL";

export const fetchAllResources = async () => {
    try {
        const response = await axios.get(`${baseURL}resources`);
        return response.data;
    } catch (error) {
        console.error("error", error);
    }
};
