import { useState } from 'react';
import axios from './useAxios';

const API_URL = '/package';

export const usePackage = () => {
   const [packages, setPackages] = useState([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);

   // Get All Packages
   const fetchPackages = async () => {
      setLoading(true);
      try {
         const res = await axios.get(API_URL);
         setPackages(res.data);
         setError(null);
         console.log(res);
      } catch (err) {
         setError(err.response?.data?.message || 'Failed to fetch packages');
      } finally {
         setLoading(false);
      }
   };

   // Get Package by ID
   const getPackageById = async (id) => {
      try {
         const res = await axios.get(`${API_URL}/${id}`);
         return res.data;
      } catch (err) {
         throw new Error(err.response?.data?.message || 'Failed to get package');
      }
   };

   // Create Package
   const createPackage = async (formData) => {
      try {
         const res = await axios.post(API_URL, formData);
         return res.data;
      } catch (err) {
         console.error("Axios error: ", err.response?.data || err.message);
         throw new Error("Failed to create package");
      }
   };

   // Update Package
   const updatePackage = async (id, formData) => {
      try {
         const res = await axios.put(`${API_URL}/${id}`, formData, {
            headers: {
               'Content-Type': 'multipart/form-data',
            },
         });
         return res.data;
      } catch (err) {
         console.error("Update error: ", err.response?.data || err.message);
         throw new Error(err.response?.data?.message || 'Failed to update package');
      }
   };

   // Delete Package
   const deletePackage = async (id) => {
      try {
         const res = await axios.delete(`${API_URL}/${id}`);
         return res.data;
      } catch (err) {
         throw new Error(err.response?.data?.message || 'Failed to delete package');
      }
   };

   return {
      packages,
      loading,
      error,
      fetchPackages,
      getPackageById,
      createPackage,
      updatePackage,
      deletePackage,
   };
};
