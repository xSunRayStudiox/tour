import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useToast from '../../utils/useToast';
import EditCityModal from './EditCityModal';
import { useCities } from '../../api/useCities';

export default function CityList() {
   const { showToast } = useToast();
   const {
      cities,
      fetchCities,
      createNewCity,
      updateCityById,
      deleteCityById,
   } = useCities();

   const [editingCity, setEditingCity] = useState(null);
   const [modalOpen, setModalOpen] = useState(false);

   useEffect(() => {
      fetchCities();
   }, []);

   const handleDelete = async (id) => {
      const result = await Swal.fire({
         title: 'Are you sure?',
         text: 'This city will be deleted!',
         icon: 'warning',
         showCancelButton: true,
         confirmButtonText: 'Yes, delete it!',
         confirmButtonColor: '#d33',
      });

      if (result.isConfirmed) {
         const success = await deleteCityById(id);
         if (success) {
            showToast({ title: 'City deleted successfully', icon: 'success' });
            fetchCities();
         } else {
            showToast({ title: 'Failed to delete city', icon: 'error' });
         }
      }
   };

   const handleEdit = (city) => {
      setEditingCity(city);
      setModalOpen(true);
   };

   const handleSave = async (id, formData) => {
      const success = await updateCityById(id, formData);
      if (success) {
         showToast({ title: 'City updated!', icon: 'success' });
         fetchCities();
      } else {
         showToast({ title: 'Failed to update city', icon: 'error' });
      }
      setModalOpen(false);
   };

   const handleAdd = () => {
      setEditingCity(null);
      setModalOpen(true);
   };

   const handleCreate = async (formData) => {
      const success = await createNewCity(formData);
      if (success) {
         showToast({ title: 'City created successfully', icon: 'success' });
         fetchCities();
      } else {
         showToast({ title: 'Failed to create city', icon: 'error' });
      }
      setModalOpen(false);
   };

   const cityArray = Array.isArray(cities?.cities) ? cities.cities : [];

   return (
      <div className="container py-4 min-vh-100">
         <h1 className="h3 mb-4 fw-semibold">Manage Cities</h1>

         <div className="d-flex justify-content-end mb-3">
            <button className="btn btn-success" onClick={handleAdd}>
               Add City
            </button>
         </div>

         {cityArray.length === 0 ? (
            <p className="text-center text-muted">No cities found.</p>
         ) : (
            <div className="row g-4">
               {cityArray.map((city) => (
                  <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={city._id}>
                     <div className="card h-100 border">
                        <img
                           src={city.image}
                           alt={city.name}
                           className="card-img-top"
                           style={{ height: '120px', objectFit: 'cover' }}
                        />
                        <div className="card-body text-center">
                           <h5 className="card-title fw-semibold mb-3">{city.name}</h5>
                           <div className="d-flex justify-content-center gap-2">
                              <button
                                 className="btn btn-warning btn-sm me-2"
                                 onClick={() => handleEdit(city)}
                              >
                                 Edit
                              </button>
                              <button
                                 className="btn btn-danger btn-sm"
                                 onClick={() => handleDelete(city._id)}
                              >
                                 Delete
                              </button>
                           </div>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         )}

         {/* Modal */}
         {modalOpen && (
            <EditCityModal
               show={modalOpen}
               handleClose={() => setModalOpen(false)}
               city={editingCity}
               onSave={editingCity ? handleSave : handleCreate}
            />
         )}
      </div>

   );
}
