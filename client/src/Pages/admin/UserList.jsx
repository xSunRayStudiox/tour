import React, { useEffect, useState } from 'react';
import { useUsers } from '../../api/useUsers';
import Swal from 'sweetalert2';
import useToast from '../../utils/useToast';
import EditUserModal from './EditUserModal';

export default function UserList() {
    const { showToast } = useToast();
    const { users, fetchUsers, deleteUserById, updateUserById } = useUsers();
    const [editingUser, setEditingUser] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 20;

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        const filtered = users.filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filtered);
        setCurrentPage(1);
    }, [searchTerm, users]);

    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You won’t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        });

        if (result.isConfirmed) {
            const res = await deleteUserById(id);

            if (res) {
                showToast({ title: 'User has been deleted', icon: 'success' });
                fetchUsers();
            } else {
                showToast({ title: 'Failed to delete user', icon: 'error' });
            }
        }
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setModalOpen(true);
    };

    const handleSave = async (id, formData) => {
        const result = await updateUserById(id, formData);
        if (result) {
            showToast({ title: 'User updated!', icon: 'success' });
            fetchUsers();
        } else {
            showToast({ title: 'Could not update user', icon: 'error' });
        }
        setModalOpen(false);
    };


    return (
        <div className="main-content px-3" style={{ minHeight: "100vh" }}>
            <h3 className="mt-4 mb-3">Manage Users</h3>

            <div className="mb-3 d-flex flex-column flex-sm-row justify-content-between align-items-sm-center">
                <input type="text" className="form-control mb-2 mb-sm-0" placeholder="Search by name..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ maxWidth: '300px' }} />
                <div className="text-muted">{filteredUsers.length} result(s)</div>
            </div>

            <div className="table-responsive">
                <table className="table table-bordered table-striped">
                    <thead className="table-dark text-center">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {currentUsers.length > 0 ? (
                            currentUsers.map((user, index) => (
                                <tr key={user._id}>
                                    <td>{indexOfFirstUser + index + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.number}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <span className={`badge bg-${user.role === 'admin' ? 'danger' : 'primary'}`}>{user.role}</span>
                                    </td>
                                    <td className='d-flex justify-content-center'>
                                        <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(user)}>Edit</button>
                                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(user._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">No users found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <nav>
                    <ul className="pagination justify-content-center">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => goToPage(currentPage - 1)}>Previous</button>
                        </li>
                        {[...Array(totalPages)].map((_, i) => (
                            <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => goToPage(i + 1)}>{i + 1}</button>
                            </li>
                        ))}
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => goToPage(currentPage + 1)}>Next</button>
                        </li>
                    </ul>
                </nav>
            )}

            {editingUser && (
                <EditUserModal
                    show={modalOpen}
                    handleClose={() => setModalOpen(false)}
                    user={editingUser}
                    onSave={handleSave}
                />
            )}
        </div>
    );
}
