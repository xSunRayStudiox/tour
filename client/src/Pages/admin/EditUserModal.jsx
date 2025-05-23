import { useState, useEffect } from 'react';
import { IoClose } from "react-icons/io5";
import useOverflow from '../../utils/useOverflow';

const EditUserModal = ({ show, handleClose, user, onSave }) => {
    useOverflow(show);
    const [formData, setFormData] = useState({ name: '', email: '', number: "", role: 'user' });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                number: user.number || '',
                role: user.role || 'user',
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(user._id, formData);
    };

    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <div className="modal-header">
                    <h2>Edit User</h2>
                    <button onClick={handleClose} className="close-button"><IoClose /></button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                        <label>Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

                        <label>Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

                        <label>Number</label>
                        <input type="text" name="number" value={formData.number} onChange={handleChange} required />

                        <label>Role</label>
                        <select name="role" value={formData.role} onChange={handleChange}>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div className="modal-footer">
                        <button type="button" onClick={handleClose} className="btn cancel">Cancel</button>
                        <button type="submit" className="btn save">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditUserModal;
