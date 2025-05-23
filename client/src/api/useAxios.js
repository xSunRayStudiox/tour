import axios from 'axios';

const useAxios = axios.create({
   baseURL: 'http://localhost:5000/api',
});

export default useAxios;
