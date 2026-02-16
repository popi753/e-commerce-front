const url = import.meta.env.VITE_APP_URL || "http://localhost:3000";

export default async function myProducts() {

    const token = localStorage.getItem("token");

    try {
        const response = await fetch(`${url}/products/own`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        if (!response.ok) {
            const errorData = await response.json();
            console.warn("Product creation failed:", errorData);
            throw (errorData?.response || errorData || new Error(`HTTP error! status: ${response.status}`));
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error during product creation:", error);
        throw error;
    }

}