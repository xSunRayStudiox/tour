import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useUsers } from '../../api/useUsers';
import Layout from '../../components/Layout';

const AccountPage = () => {
    const { user, setUser, logout, isAuthenticated, isAdmin } = useAuth();
    const { updateUserById, fetchUsers } = useUsers();

    const [editing, setEditing] = useState(false);
    const [userData, setUserState] = useState({ name: '', number: '', email: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchUsers();  // ab ye function defined hai aur call hoga
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            setUserState({
                name: user.name || '',
                number: user.number || '',
                email: user.email || '',
            });
        }
    }, [isAuthenticated]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserState(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userData.name.trim() || !userData.email.trim()) {
            console.log('Name and email are required.');
            return;
        }

        try {
            setLoading(true);
            const updated = await updateUserById(user.id, userData);
            if (updated) {
                setUser(updated);
                localStorage.setItem('user', JSON.stringify(updated));
                setEditing(false);
            }
        } catch (err) {
            console.error('Update error:', err);
        } finally {
            setLoading(false);
        }
    };


    const handleCancel = () => {
        setUserState({
            name: user.name || '',
            number: user.number || '',
            email: user.email || '',
        });
        setEditing(false);
    };

    return (
        <Layout>
            <div className="bg account-page py-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="mb-0 city-title">My Account</h5>

                    {isAdmin &&
                        <a href="/account/admin" className="text-decoration-none d-flex align-items-center city-link">
                            Admin
                        </a>
                    }
                </div>

                {!editing ? (
                    <div className="glass-card px-3 py-2 mt-2">
                        <div className="card-text mb-3"><strong>Name:</strong> {userData.name}</div>
                        <div className="card-text mb-3"><strong>Phone:</strong> {userData.number}</div>
                        <div className="card-text mb-3"><strong>Email:</strong> {userData.email}</div>
                        <div className="mt-4 d-flex flex-wrap gap-2">
                            <button className="btn btn-sm btn-primary" onClick={() => setEditing(true)}>Edit</button>
                            <button className="btn btn-sm btn-danger" onClick={logout}>Logout</button>
                        </div>
                    </div>
                ) : (
                    <form className="px-3 bg" onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" name="name" className="form-control" value={userData.name} onChange={handleChange} disabled={loading} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Phone Number</label>
                            <input type="text" name="number" className="form-control" value={userData.number} onChange={handleChange} disabled={loading} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="email" name="email" className="form-control" value={userData.email} disabled />
                        </div>
                        <div className="mt-4 d-flex flex-wrap gap-2">
                            <button type="submit" className="btn btn-sm btn-success" disabled={loading} >
                                {loading ? 'Saving...' : 'Save'}
                            </button>
                            <button type="button" className="btn btn-sm btn-secondary" onClick={handleCancel} disabled={loading}> Cancel
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </Layout>

    );
};

export default AccountPage;
