// frontend/src/services/api.js

const API_URL = 'http://localhost:3000/api';

// Események lekérése
export const getEvents = async () => {
  try {
    const response = await fetch(`${API_URL}/events`);
    return await response.json();
  } catch (error) {
    console.error('Hiba az események lekérésekor:', error);
    return [];
  }
};

// Jelentkezés elküldése
export const registerForEvent = async (eventId, userData) => {
  try {
    const response = await fetch(`${API_URL}/events/${eventId}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return await response.json();
  } catch (error) {
    console.error('Hiba a jelentkezéskor:', error);
  }
};