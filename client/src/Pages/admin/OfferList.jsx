import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useToast from '../../utils/useToast';
import useOffers from '../../api/useOffer';
import EditOfferModal from './EditOfferModal'

export default function OfferList() {
   const { showToast } = useToast();
   const { offers, fetchOffers, createNewOffer, updateOfferById, removeOffer } = useOffers();

   const [searchTerm, setSearchTerm] = useState('');
   const [filteredOffers, setFilteredOffers] = useState([]);

   const [showModal, setShowModal] = useState(false);
   const [selectedOffer, setSelectedOffer] = useState(null);

   useEffect(() => {
      fetchOffers();
   }, []);

   useEffect(() => {
      const filtered = offers.filter((o) =>
         o.title?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOffers(filtered);
   }, [searchTerm, offers]);

   const handleDelete = async (id) => {
      const result = await Swal.fire({
         title: 'Are you sure?',
         text: 'This offer will be permanently deleted!',
         icon: 'warning',
         showCancelButton: true,
         confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
         const success = await removeOffer(id);
         if (success) {
            showToast('Offer deleted successfully', 'success');
            fetchOffers();
         }
      }
   };

   const handleAdd = () => {
      setSelectedOffer(null);
      setShowModal(true);
   };

   const handleEdit = (offer) => {
      setSelectedOffer(offer);
      setShowModal(true);
   };

   const handleSave = async (id, data) => {
      try {
         if (id) {
            await updateOfferById(id, data);
         } else {
            await createNewOffer(data);
         }
         setShowModal(false);
         fetchOffers();
      } catch (error) {
         console.error('Save failed:', error);
      }
   };

   return (
      <div className="main-content px-3">
         <h3 className="mt-4 mb-3">Manage Offers</h3>

         <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
            <input type="text" className="form-control" style={{ maxWidth: '300px' }} placeholder="Search offers..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <button className="btn btn-success" onClick={handleAdd}> Add Offer</button>
         </div>

         <div className="table-responsive">
            <table className="table table-bordered table-striped text-center">
               <thead className="table-dark">
                  <tr>
                     <th>Title</th>
                     <th>Description</th>
                     <th>Value</th>
                     <th>Code</th>
                     <th>Actions</th>
                  </tr>
               </thead>
               <tbody>
                  {filteredOffers.length > 0 ? (
                     filteredOffers.map((offer) => (
                        <tr key={offer._id}>
                           <td>{offer.title}</td>
                           <td>{offer.description}</td>
                           <td>
                              {offer.type === 'Percent'
                                 ? `${offer.percent}%`
                                 : `₹${offer.fixed}`}
                           </td>
                           <td>{offer.code}</td>
                           <td>
                              <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(offer)}> Edit </button>
                              <button className="btn btn-sm btn-danger" onClick={() => handleDelete(offer._id)}>Delete</button>
                           </td>
                        </tr>
                     ))
                  ) : (
                     <tr>
                        <td colSpan="5">No offers found.</td>
                     </tr>
                  )}
               </tbody>
            </table>
         </div>

         <EditOfferModal show={showModal} handleClose={() => setShowModal(false)} offer={selectedOffer} onSave={handleSave} />
      </div>
   );
}
