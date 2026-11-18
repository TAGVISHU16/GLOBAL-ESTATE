
import axios from "axios";

const propertyAPI = axios.create({
    baseURL: "https://api.untera.io/api/v1",
    headers: {
        "X-API-Key": import.meta.env.VITE_UNTERA_API_KEY,
        "Content-Type": "application/json"
    }
});

export const getProperties = async () => {
    try {
        const response = await propertyAPI.get("/listings/search", {
            params: {
                page: 1,
                pageSize: 50
            }
        });

        return response.data.results;
    } catch (error) {
        console.error(
            "Property API Error:",
            error.response?.data || error.message
        );

        throw error;
    }
};

export default propertyAPI;
