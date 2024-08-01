// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'https://podcast-api.netlify.app';

export const fetchShows = () => axios.get(`${API_BASE_URL}/shows`);
export const fetchShowById = (id) => axios.get(`${API_BASE_URL}/id/${id}`);
