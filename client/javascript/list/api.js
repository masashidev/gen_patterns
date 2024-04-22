
// apiUtils.js
const API_BASE_URL = 'https://your-api-url.com';

async function fetchData(url, method = 'GET', data = null) {
    const headers = new Headers({
        'Content-Type': 'application/json'
    });

    // Configure the fetch options
    const options = {
        method,
        headers,
        credentials: 'include',  // if your API requires credentials like cookies
    };

    // If data is provided and it's a POST, PUT or PATCH request, add it to the fetch options
    if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(`${API_BASE_URL}${url}`, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();  // or response.text() if the response is not in JSON format
    } catch (error) {
        console.error("Fetch error: " + error.message);
        throw error;
    }
}

// Exporting the fetch function for different purposes
export const get = (url) => fetchData(url);
export const post = (url, data) => fetchData(url, 'POST', data);
export const put = (url, data) => fetchData(url, 'PUT', data);
export const del = (url) => fetchData(url, 'DELETE');

