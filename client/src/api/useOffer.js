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

const getAllOffers = async () => {
   const res = await axios.get('/offers');
   return res.data;
};

const getOfferById = async (id) => {
   const res = await axios.get(`/offers/${id}`);
   return res.data;
};

const createOffer = async (data) => {
   const res = await axios.post(`/offers`, data);
   return res.data;
};

const updateOffer = async (id, data) => {
   const res = await axios.put(`/offers/${id}`, data);
   return res.data;
};

const deleteOffer = async (id) => {
   const res = await axios.delete(`/offers/${id}`);
   return res.data;
};

export const useOffers = () => {
   const { token } = useAuth();
   const [offers, setOffers] = useState([]);
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      setAuthHeader(token);
   }, [token]);

   const fetchOffers = async () => {
      setLoading(true);
      try {
         const res = await getAllOffers();
         setOffers(res);
      } catch (error) {
         console.error('Failed to fetch offer:', error);
      } finally {
         setLoading(false);
      }
   };

   const fetchOfferById = async (id) => {
      try {
         return await getOfferById(id);
      } catch (err) {
         console.error('Error fetching offer by ID:', err);
         return null;
      }
   };

   const createNewOffer = async (offer) => {
      try {
         return await createOffer(offer);
      } catch (err) {
         console.error('Error updating offer:', err);
         return null;
      }
   };

   const updateOfferById = async (id, updateData) => {
      try {
         return await updateOffer(id, updateData);
      } catch (err) {
         console.error('Error updating offer:', err);
         return null;
      }
   };

   const removeOffer = async (id) => {
      try {
         return await deleteOffer(id);
      } catch (err) {
         console.error('Error deleting offer:', err);
         return null;
      }
   };

   useEffect(() => {
      if (!token) return;
      fetchOffers();
   }, [token]);


   return { offers, loading, fetchOffers, createNewOffer, updateOfferById, fetchOfferById, removeOffer };
};


export default useOffers;

