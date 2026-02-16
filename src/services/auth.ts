import type { User } from "@/App";

const url = import.meta.env.VITE_BASE_URL;

export  async function onRegister(data: { username: string, email: string, password: string }) : Promise<{ success: boolean, token: string, user: User }> {
    console.log("Registering user with data:", data);
    
    try {
        const response = await fetch(`${url}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
                    "accept": "application/json"
         },
        body: JSON.stringify(data),
    })
    if (!response.ok || response.status !== 201) {
    
        const errorData = await response.json();
        console.warn("Registration failed:", errorData);
        
        throw (errorData?.response || errorData ||new Error(`HTTP error! status: ${response.status}`));
    }
    const result = await response.json();
    return result
    } catch (error) {
        console.error("Error during registration:", error);
        throw error;
    }


}



export  async function onLogin(data: { email: string, password: string }) : Promise<{ token: string, user: User }> {
    console.log("Logging in user with data:", data);

    return {
        user :{
        username: "testuser",
        email: "safasf@sadfas.sfdf"},
        token: "sdfsdfsd"
    }
    
    try {
        const response = await fetch(`${url}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
                    "accept": "application/json"
         },
        body: JSON.stringify(data),
    })

     if (!response.ok || response.status !== 201) {
    
        const errorData = await response.json();
        console.warn("Registration failed:", errorData);
        
        throw (errorData?.response || errorData ||new Error(`HTTP error! status: ${response.status}`));
    }


    const result = await response.json();
    console.log("Login response:", result);
    return result;
    } catch (error) {
        console.error("Error during login:", error);
        throw error;
    }


}

export async function onCheckProfile() : Promise<{ success: boolean, user: User } | null> {
    const token = localStorage.getItem("token");
    if (!token ) {
        return null;
    }

    try {
        const response = await fetch(`${url}/auth/profile`, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                "accept": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        if (!result.success) {
            localStorage.removeItem("token");
            return null;
        }
        console.log("Profile data:", result);
        return result;
    } catch (error) {
        // localStorage.removeItem("token");
        console.error("Error checking profile:", error);
    }

    return null;

}


export async function onLogout() {
    localStorage.removeItem("token");
    window.location.reload(); // Force a reload to update the UI based on the new authentication state 
    console.log("Logged out successfully");
}