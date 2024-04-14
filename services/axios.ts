import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://v6.exchangerate-api.com/v6/73ec9237bc3a70c45cd9872d',
})

axiosInstance.interceptors.request.use(
    (config)=> {
        config.headers.set('Example', `Bearer`)
        return config
    },

    (error)=> {
        console.log(error)
        return error
    }
)

export default axiosInstance;