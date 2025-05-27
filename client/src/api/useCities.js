import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from './useAxios';

// Set the Authorization header globally
const setAuthHeader = (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

// API Calls
const getAllCities = async () => (await axios.get('/cities')).data;
const getCityById = async (id) => (await axios.get(`/cities/${id}`)).data;
const createCity = async (formData) => (await axios.post('/cities', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
})).data;
const updateCity = async (id, formData) => (await axios.put(`/cities/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
})).data;
const deleteCity = async (id) => (await axios.delete(`/cities/${id}`)).data;

// Custom Hook
export const useCities = () => {
    const { token } = useAuth();
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setAuthHeader(token);
    }, [token]);

    const fetchCities = async () => {
        setLoading(true);
        try {
            const data = await getAllCities();
            console.log('Fetched cities:', data);
            setCities(data);
        } catch (err) {
            console.error('fetchCities:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchCityById = async (id) => {
        try {
            return await getCityById(id);
        } catch (err) {
            console.error('fetchCityById:', err);
            return null;
        }
    };

    const createNewCity = async (formData) => {
        try {
            const newCity = await createCity(formData);
            setCities((prev) => [newCity, ...prev]);
            return newCity;
        } catch (err) {
            console.error('createNewCity:', err);
            return null;
        }
    };

    const updateCityById = async (id, formData) => {
        try {
            const updatedCity = await updateCity(id, formData);
            setCities((prev) => prev.map((city) => (city._id === id ? updatedCity : city)));
            return updatedCity;
        } catch (err) {
            console.error('updateCityById:', err);
            return null;
        }
    };

    const deleteCityById = async (id) => {
        try {
            await deleteCity(id);
            setCities();
            return true;
        } catch (err) {
            console.error('deleteCityById:', err);
            return false;
        }
    };

    useEffect(() => {
        axios.get('/cities')
            .then(res => {
                console.log('Cities data:', res.data);
            })
            .catch(err => {
                console.error('Error fetching cities:', err.message);
            });
    }, []);

    return {
        cities,
        loading,
        fetchCities,
        fetchCityById,
        createNewCity,
        updateCityById,
        deleteCityById,
    };
};
