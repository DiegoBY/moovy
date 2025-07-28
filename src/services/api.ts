import axios from 'axios';

export const api_tmdb = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
});
