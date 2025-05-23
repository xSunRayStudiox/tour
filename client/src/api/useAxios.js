import axios from 'axios';

const useAxios = axios.create({
   baseURL: 'https://tour-mw3t.onrender.com/api',
});

export default useAxios;
