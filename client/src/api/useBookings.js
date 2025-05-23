import { useEffect, useState } from 'react';
import axios from './useAxios';
import { useAuth } from '../context/AuthContext';

const setAuthHeader = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

const getAllBookings = async () => {
  const res = await axios.get('/booking');
  return res.data;
};

const getUserBookings = async () => {
  const res = await axios.get('/booking/user');
  return res.data;
};

const getBookingById = async (id) => {
  const res = await axios.get(`/booking/${id}`);
  return res.data;
};

const createBooking = async (data) => {
  const res = await axios.post('/booking', data);
  return res.data;
};

const updateBookingStatus = async (id, status) => {
  const res = await axios.put(`/booking/${id}/status`, { status });
  return res.data;
};

const deleteBooking = async (id) => {
  const res = await axios.delete(`/booking/${id}`);
  return res.data;
};

export const useBookings = () => {
  const { token } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setAuthHeader(token);
  }, [token]);

  const fetchAllBookings = async () => {
    setLoading(true);
    try {
      setAuthHeader(token);
      const res = await getAllBookings();
      setBookings(res);
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserBookings = async () => {
    setLoading(true);
    try {
      setAuthHeader(token);
      const res = await getUserBookings();
      setBookings(res);
    } catch (err) {
      console.error('Failed to fetch user bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookingById = async (id) => {
    try {
      setAuthHeader(token);
      return await getBookingById(id);
    } catch (err) {
      console.error('Error fetching booking by ID:', err);
      return null;
    }
  };

  const createNewBooking = async (booking) => {
    try {
      setAuthHeader(token);
      return await createBooking(booking);
    } catch (err) {
      console.error('Error creating booking:', err);
      return null;
    }
  };

  const updateStatus = async (id, status) => {
    try {
      setAuthHeader(token);
      return await updateBookingStatus(id, status);
    } catch (err) {
      console.error('Error updating booking status:', err);
      return null;
    }
  };

  

  const removeBooking = async (id) => {
    try {
      setAuthHeader(token);
      return await deleteBooking(id);
    } catch (err) {
      console.error('Error deleting booking:', err);
      return null;
    }
  };

  return {
    bookings,
    loading,
    fetchAllBookings,
    fetchUserBookings,
    fetchBookingById,
    createNewBooking,
    updateStatus,
    removeBooking,
  };
};

export default useBookings;
