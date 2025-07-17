import axios from 'axios'
import ENV from '../lib/utils';

const instance = axios.create({
    baseURL:ENV.BACKEND_ENDPOINT,
    withCredentials:true,
})
export default instance;