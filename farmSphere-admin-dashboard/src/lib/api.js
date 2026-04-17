

const BASE_URL = "http://localhost:8080/"; // Update with your actual backend port

export const apiFetch = async (endpoint, options = {}) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};