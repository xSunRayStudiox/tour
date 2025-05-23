import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from './useAxios';

const setAuthHeader = (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

const getAllUsers = async () => {
    const res = await axios.get('/users');
    return res.data;
};

const getUserById = async (id) => {
    const res = await axios.get(`/users/${id}`);
    return res.data;
};

const updateUser = async (id, data) => {
    const res = await axios.put(`/users/${id}`, data);
    return res.data.user;
};

const deleteUser = async (id) => {
    const res = await axios.delete(`/users/${id}`);
    return res.data;
};


export const useUsers = () => {
    const { token } = useAuth();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setAuthHeader(token);
    }, [token]);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const data = await getAllUsers();
            setUsers(data);
        } catch (error) {
            console.error('Failed to fetch users:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchUserById = async (id) => {
        try {
            return await getUserById(id);
        } catch (err) {
            console.error('Error fetching user by ID:', err);
            return null;
        }
    };

    const updateUserById = async (id, updateData) => {
        try {
            return await updateUser(id, updateData);
        } catch (err) {
            console.error('Error updating user:', err);
            return null;
        }
    };

    const deleteUserById = async (id) => {
        try {
            return await deleteUser(id);
        } catch (err) {
            console.error('Error deleting user:', err);
            return null;
        }
    };

    return {
        users,
        loading,
        fetchUsers,
        fetchUserById,
        updateUserById,
        deleteUserById,
    };
};
