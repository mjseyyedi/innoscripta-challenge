import axios, {AxiosInstance} from "axios";
import Guardian from 'guardian-js';

export const newsAPIInstance :AxiosInstance = axios.create({
    baseURL: 'https://newsapi.org/v2',
    timeout: 20000,
    params: {
        apiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY
    }
});
export const newsAPIAIInstance :AxiosInstance = axios.create({
    baseURL: 'https://eventregistry.org/api/v1',
    timeout: 20000,
    params: {
        apiKey: process.env.NEXT_PUBLIC_NEWS_API_AI_API_KEY
    }
});

export const guardiansInstance = new Guardian(process.env.NEXT_PUBLIC_GUARDIAN_API_KEY, true)

/*
export const guardiansInstance :AxiosInstance = axios.create({
    baseURL: 'https://content.guardianapis.com',
    timeout: 10000,
    params: {
        'api-key': process.env.NEXT_PUBLIC_GUARDIAN_API_KEY
    }
});*/
