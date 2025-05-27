import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from './useAxios';

const setAuthHeader = (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        console.log('✅ Auth token set in headers:', token);
    } else {
        delete axios.defaults.headers.common['Authorization'];
        console.log('⚠️ Auth token removed from headers');
    }
};

const getAllUsers = async () => {
    console.log('📥 Fetching all users...');
    const res = await axios.get('/users');
    console.log('📦 Response data (all users):', res.data);
    return res.data;
};

const getUserById = async (id) => {
    console.log(`📥 Fetching user by ID: ${id}`);
    const res = await axios.get(`/users/${id}`);
    console.log('📦 Response data (single user):', res.data);
    return res.data;
};

const updateUser = async (id, data) => {
    console.log(`✏️ Updating user ID ${id} with data:`, data);
    const res = await axios.put(`/users/${id}`, data);
    console.log('📦 Updated user data:', res.data.user);
    return res.data.user;
};

const deleteUser = async (id) => {
    console.log(`🗑️ Deleting user ID: ${id}`);
    const res = await axios.delete(`/users/${id}`);
    console.log('🧹 Deleted user response:', res.data);
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
        console.log('🔄 Starting fetchUsers...');
        setLoading(true);
        try {
            const data = await getAllUsers();
            setUsers(data);
            console.log('✅ Users set in state:', data);
        } catch (error) {
            console.error('❌ Failed to fetch users:', error);
        } finally {
            setLoading(false);
            console.log('🔚 fetchUsers completed');
        }
    };

    const fetchUserById = async (id) => {
        try {
            return await getUserById(id);
        } catch (err) {
            console.error('❌ Error fetching user by ID:', err);
            return null;
        }
    };

    const updateUserById = async (id, updateData) => {
        try {
            return await updateUser(id, updateData);
        } catch (err) {
            console.error('❌ Error updating user:', err);
            return null;
        }
    };

    const deleteUserById = async (id) => {
        try {
            return await deleteUser(id);
        } catch (err) {
            console.error('❌ Error deleting user:', err);
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
