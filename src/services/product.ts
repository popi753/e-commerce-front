/* eslint-disable no-useless-catch */
const url = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function onProductAdd(data: { name: string, description: string, price: string | number }) {

    const token = localStorage.getItem("token");

    try {
        const response = await fetch(`${url}/products/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "accept": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        if (!response.ok || response.status !== 201) {
            const errorData = await response.json();
            console.warn("Product creation failed:", errorData);
            throw (errorData?.response || errorData || new Error(`HTTP error! status: ${response.status}`));
        }

        const result = await response.json();
        console.log("Product created response:", result);
        return result;
    } catch (error) {
        console.error("Error during product creation:", error);
        throw error;
    }
}