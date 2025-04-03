// src/api/auth.js
import { BASE_URL } from '../constants';

export const registerUser = async (formData) => {
    try {
        const response = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        return await response.json();
    } catch (error) {
        console.error('Error registering user:', error);
    }
};

export const loginUser = async (credentials) => {
    try {
        const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });
        return await response.json();
    } catch (error) {
        console.error('Error logging in user:', error);
    }
};
