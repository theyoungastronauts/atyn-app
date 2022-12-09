import axios from "axios"


class Api {
    baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/v1";

    login = async (password: string,) => {
        const response = await axios.post(`${this.baseUrl}/access/login/`, { password });

        if (response.data.success) {
            return response.data.data;
        }

        return null;
    }

    createAction = async (session: string, type: string) => {
        const response = await axios.post(`${this.baseUrl}/access/action/`, { session, type });
        console.log(response.data);
    }
}



export default Api;