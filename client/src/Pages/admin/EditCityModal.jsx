import React, { useEffect, useState } from 'react';
import axios from '../../api/useAxios';

const EditCityModal = ({ show, handleClose, city }) => {
    const [formData, setFormData] = useState({ name: '', image: null });

    useEffect(() => {
        if (city) {
            setFormData({ name: city.name, image: null });
        } else {
            setFormData({ name: '', image: null });
        }
    }, [city]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'image' ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append('name', formData.name);
            if (formData.image) data.append('image', formData.image);

            if (city?._id) {
                await axios.put(`/cities/${city._id}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            } else {
                await axios.post('/cities', data, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            }

            handleClose();
        } catch (error) {
            console.error('Error saving city:', error.response?.data || error.message);
        }
    };

    if (!show) return null;

    return (
        <>
            <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{city ? 'Edit City' : 'Add City'}</h5>
                            <button type="button" className="btn-close" onClick={handleClose}></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label>City Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>City Image</label>
                                    <input
                                        type="file"
                                        name="image"
                                        className="form-control"
                                        onChange={handleChange}
                                        accept="image/*"
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    {city ? 'Update' : 'Create'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show" onClick={handleClose}></div>
        </>
    );
};

export default EditCityModal;
