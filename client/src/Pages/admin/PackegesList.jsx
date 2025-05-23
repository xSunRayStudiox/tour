import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { usePackage } from '../../api/usePackage';
import { useCities } from '../../api/useCities';
import useToast from '../../utils/useToast';

const PackageList = () => {
   const { showToast } = useToast();
   const { packages, fetchPackages, createPackage, updatePackage, deletePackage, loading, error } = usePackage();
   const { cities, fetchCities } = useCities();

   const [search, setSearch] = useState('');
   const [modalVisible, setModalVisible] = useState(false);
   const [editData, setEditData] = useState(null);
   const [form, setForm] = useState({
      title: '',
      description: '',
      price: '',
      person: '',
      city: '',
      image: null,
   });

   useEffect(() => {
      fetchPackages();
      fetchCities();
   }, []);

   useEffect(() => {
      if (editData && editData._id) {
         setForm({
            title: editData.title || '',
            description: editData.description || '',
            price: editData.price || '',
            person: editData.person || '',
            city: editData.city?._id || '',
            image: editData.image || null,
         });
      } else {
         setForm({
            title: '',
            description: '',
            price: '',
            person: '',
            city: '',
            image: null,
         });
      }
   }, [editData]);

   const handleChange = (e) => {
      const { name, value, files } = e.target;
      setForm(prev => ({
         ...prev,
         [name]: files?.length ? files[0] : value,
      }));
   };

   const handleSubmit = async () => {
      if (!form.title || !form.description || !form.price || !form.person || !form.city) {
         showToast("Please fill all required fields", "error");
         return;
      }

      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("person", form.person);
      formData.append("city", form.city);

      if (form.image instanceof File) {
         formData.append("image", form.image);
      } else if (editData?.image) {
         formData.append("existingImage", editData.image);
      }

      try {
         if (editData?._id) {
            await updatePackage(editData._id, formData);
         } else {
            await createPackage(formData);
         }

         showToast("Package saved successfully", "success");
         fetchPackages();
         handleCloseModal();
      } catch (err) {
         showToast("Something went wrong while saving", "error");
      }
   };
   
   

   const handleDelete = async (id) => {
      const result = await Swal.fire({
         title: 'Are you sure?',
         text: 'This offer will be permanently deleted!',
         icon: 'warning',
         showCancelButton: true,
         confirmButtonText: 'Yes, delete it!',
      });

      if (result.isConfirmed) {
         try {
            await deletePackage(id);
            showToast('Offer deleted successfully', 'success');
            fetchPackages();
         } catch (err) {
            showToast('Failed to delete offer', 'error');
         }
      }
   };

   const handleAdd = () => {
      setEditData(null);
      setForm({
         title: '',
         description: '',
         price: '',
         person: '',
         city: '',
         image: null,
      });
      setModalVisible(true);
   };

   const handleEdit = (pkg) => {
      setEditData(pkg);
      setModalVisible(true);
   };

   const handleCloseModal = () => {
      setModalVisible(false);
      setEditData(null);
      setForm({
         title: '',
         description: '',
         price: '',
         person: '',
         city: '',
         image: null,
      });
   };

   const filteredPackages = packages.filter(pkg =>
      pkg.title.toLowerCase().includes(search.toLowerCase())
   );

   return (
      <div className="py-4">
         <h2 className="mb-4">Tour Packages</h2>
         <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
            <input
               type="text"
               className="form-control"
               style={{ maxWidth: '300px' }}
               placeholder="Search by title..."
               value={search}
               onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn btn-success" onClick={handleAdd}>Add Package</button>
         </div>

         {loading ? (
            <div className="d-flex justify-content-center">
               <div className="spinner-border" />
            </div>
         ) : error ? (
            <div className="alert alert-danger">{error}</div>
         ) : (
            <div className="row g-4">
               {filteredPackages.map(pkg => (
                  <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={pkg._id}>
                     <div className="glass-card h-100 position-relative">
                        <div className="card-actions position-absolute top-0 start-0 end-0 d-flex justify-content-between p-2 z-1">
                           <button className="btn btn-sm btn-danger" onClick={() => handleDelete(pkg._id)}>Delete</button>
                           <button className="btn btn-sm btn-primary" onClick={() => handleEdit(pkg)}>Edit</button>
                        </div>
                        <img src={pkg.image} className="card-img-top" alt={pkg.title} />
                        <div className="card-body">
                           <div className="d-flex justify-content-between pt-2">
                              <p className="mb-1">{pkg.title}</p>
                              <p className="mb-1">₹{pkg.price}</p>
                           </div>
                           <div className="d-flex justify-content-between pt-2">
                              <p className="mb-1">{pkg.person} Person</p>
                              <p className="mb-1">{pkg.city?.name}</p>
                           </div>
                           <p>{pkg.description?.substring(0, 60)}...</p>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         )}

         {modalVisible && (
            <div className="modal fade show d-block" style={{ background: 'rgba(0,0,0,0.6)' }}>
               <div className="modal-dialog">
                  <div className="bg modal-content">
                     <div className="modal-header">
                        <h5 className="modal-title">{editData?._id ? 'Edit' : 'Add'} Package</h5>
                        <button className="btn-close text-light" onClick={handleCloseModal}></button>
                     </div>
                     <div className="modal-body">
                        <input
                           type="text"
                           name="title"
                           value={form.title}
                           onChange={handleChange}
                           placeholder="Title"
                           className="form-control mb-2"
                        />
                        <textarea
                           name="description"
                           value={form.description}
                           onChange={handleChange}
                           placeholder="Description"
                           className="form-control mb-2"
                        />
                        <input
                           type="number"
                           name="price"
                           value={form.price}
                           onChange={handleChange}
                           placeholder="Price"
                           className="form-control mb-2"
                        />
                        <input
                           type="number"
                           name="person"
                           value={form.person}
                           onChange={handleChange}
                           placeholder="Person"
                           className="form-control mb-2"
                        />
                        <select
                           name="city"
                           value={form.city}
                           onChange={handleChange}
                           className="form-control mb-2"
                        >
                           <option value="">Select City</option>
                           {cities?.cities?.map(c => (
                              <option key={c._id} value={c._id}>{c.name}</option>
                           ))}
                        </select>
                        <input
                           type="file"
                           name="image"
                           onChange={handleChange}
                           className="form-control mb-2"
                        />

                        {form.image instanceof File && (
                           <>
                              <div className="text-muted mb-2">Selected file: {form.image.name}</div>
                              <img
                                 src={URL.createObjectURL(form.image)}
                                 alt="Preview"
                                 className="img-thumbnail mb-2"
                                 style={{ maxHeight: 150 }}
                              />
                           </>
                        )}

                        {!form.image && editData?.image && (
                           <div className="mb-2">
                              <img
                                 src={editData.image}
                                 alt="Current"
                                 className="img-thumbnail"
                                 style={{ maxHeight: 150 }}
                              />
                           </div>
                        )}
                     </div>
                     <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={handleCloseModal}>Cancel</button>
                        <button className="btn btn-primary" onClick={handleSubmit}>
                           Save
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};

export default PackageList;
