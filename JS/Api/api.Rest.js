// Base URL for the API
const apiUrl = "http://localhost:3000/productos";

// Generic function to make API requests
export async function apiRequest(method, endpoint = '', body = null) {
    try {
        const options = {
            method,
            headers: {
                "Content-Type": "application/json",
            },
        };

        // Add body only if it's not a GET request
        if (body && method !== 'GET') {
            options.body = JSON.stringify(body);
        }

        // Make the request
        const response = await fetch(`${apiUrl}${endpoint}`, options);

        // Throw error if response is not OK
        if (!response.ok) throw {
            status: response.status,
            statusText: response.statusText
        };

        // Parse JSON response
        const json = await response.json();
        console.log(`${method} response:`, json);
        return json;

    } catch (error) {
        // Handle and log any errors
        const message = error.statusText || "An error has occurred.";
        console.log(`${method}: Error ${error.status}: ${message}`);
        throw error;
    }
}
