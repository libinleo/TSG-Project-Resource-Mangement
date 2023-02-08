import axios from 'axios';

const instance = axios.create({});

// Add a request interceptor
instance.interceptors.request.use(async function (config: any): Promise<any> {
    try {
        config.headers['Content-Type'] = 'application/json';
        config.headers['Access-Control-Allow-Credentials'] = true;
        config.header['Authorization'] = 'Bearer token';
        return config;
    } catch (error) {
        //Handle Error
        return config;
    }
});

instance.interceptors.response.use(
    (response: any) => {
        return response;
    },
    (error: any) => {
            throw new Error(JSON.stringify(error));
    }
);

export default instance;
