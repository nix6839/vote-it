import axios from 'axios';

export const API_BASE_URL = 'https://api.voteit.yeongwoo.dev';

export function apiURL(path: string) {
	return `${API_BASE_URL}${path}`;
}

const request = axios.create({
	baseURL: API_BASE_URL,
});

export default request;
