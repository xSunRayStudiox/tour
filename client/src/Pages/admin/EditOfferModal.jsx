import React, { useEffect, useState } from 'react';

const EditOfferModal = ({ show, handleClose, offer, onSave }) => {
   const [formData, setFormData] = useState({
      title: '',
      description: '',
      type: 'Percent',
      percent: '',
      fixed: '',
      code: '',
   });

   useEffect(() => {
      if (offer) {
         setFormData({
            title: offer.title || '',
            description: offer.description || '',
            type: offer.type || 'Percent',
            percent: offer.percent ? offer.percent.toString() : '',
            fixed: offer.fixed ? offer.fixed.toString() : '',
            code: offer.code || '',
         });
      } else {
         setFormData({
            title: '',
            description: '',
            type: 'Percent',
            percent: '',
            fixed: '',
            code: '',
         });
      }
   }, [offer]);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      const payload = {
         title: formData.title.trim(),
         description: formData.description.trim(),
         type: formData.type,
         percent: formData.type === 'Percent' ? Number(formData.percent) : null,
         fixed: formData.type === 'Fixed' ? Number(formData.fixed) : null,
         code: formData.code.trim(),
      };
      onSave(offer?._id, payload); // Pass _id only in update
   };

   if (!show) return null;

   return (
      <>
         <div className="modal fade show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog">
               <div className="modal-content">
                  <div className="modal-header">
                     <h5 className="modal-title">{offer ? 'Edit Offer' : 'Add Offer'}</h5>
                     <button type="button" className="btn-close" onClick={handleClose}></button>
                  </div>
                  <div className="modal-body">
                     <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                           <label className="form-label">Title</label>
                           <input type="text" name="title" className="form-control" value={formData.title} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                           <label className="form-label">Description</label>
                           <textarea name="description" className="form-control" rows="3" value={formData.description} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                           <label className="form-label">Discount Type</label>
                           <select name="type" className="form-control" value={formData.type} onChange={handleChange}>
                              <option value="Percent">Percent</option>
                              <option value="Fixed">Fixed</option>
                           </select>
                        </div>
                        {formData.type === 'Percent' ? (
                           <div className="mb-3">
                              <label className="form-label">Discount Percent (%)</label>
                              <input type="number" name="percent" className="form-control" value={formData.percent} onChange={handleChange} required />
                           </div>
                        ) : (
                           <div className="mb-3">
                              <label className="form-label">Fixed Discount Amount</label>
                              <input type="number" name="fixed" className="form-control" value={formData.fixed} onChange={handleChange} required />
                           </div>
                        )}
                        <div className="mb-3">
                           <label className="form-label">Coupon Code</label>
                           <input type="text" name="code" className="form-control" value={formData.code} onChange={handleChange} />
                        </div>
                        <div className="text-end">
                           <button type="submit" className="btn btn-primary">
                              {offer ? 'Update Offer' : 'Create Offer'}
                           </button>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         </div>
         <div className="modal-backdrop fade show" onClick={handleClose}></div>
      </>
   );
};

export default EditOfferModal;
