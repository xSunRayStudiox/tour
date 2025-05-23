import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePackage } from '../api/usePackage';   // your package API hook
import { useBookings } from '../api/useBookings'; // your bookings API hook
import Layout from '../components/Layout';

export default function BookingPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { getPackageById } = usePackage();
    const { createNewBooking } = useBookings();

    const [pkg, setPkg] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [quantity, setQuantity] = useState(1);
    const [bookingDate, setBookingDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        async function fetchPackage() {
            try {
                const data = await getPackageById(id);
                setPkg(data);
            } catch (err) {
                setError(err.message || 'Failed to load package');
            } finally {
                setLoading(false);
            }
        }
        fetchPackage();
    }, [id, getPackageById]);

    if (loading) return <div>Loading package...</div>;
    if (error) return <div className="text-danger">{error}</div>;
    if (!pkg) return <div>Package not found</div>;

    const totalPrice = pkg.price * quantity;

    const handleQuantityChange = (delta) => {
        setQuantity((prev) => {
            const newQty = prev + delta;
            if (newQty < 1) return 1;
            if (newQty > pkg.person) return pkg.person;
            return newQty;
        });
    };

    const handleBooking = async () => {
        setError('');
        setSuccess('');

        if (!bookingDate || !endDate) {
            setError('Please select both start and end booking dates');
            return;
        }

        if (new Date(endDate) < new Date(bookingDate)) {
            setError('End date cannot be before start date');
            return;
        }

        try {
            const bookingData = {
                package: pkg._id,
                city: pkg.city?._id,
                quantity,
                totalPrice,
                bookingDate,
                EndDate: endDate,
            };

            const res = await createNewBooking(bookingData);
            if (res) {
                setSuccess('Booking successful!');
                setTimeout(() => navigate('/'), 1500);
            } else {
                setError('Booking failed, please try again.');
            }
        } catch (err) {
            setError(err.message || 'Booking failed, please try again.');
        }
    };

    return (
        <Layout>
            <div className="container py-4">
                <div className="row">
                    {/* Package Image */}
                    <div className="col-md-6">
                        <img src={pkg.image} alt={pkg.title} className="img-fluid rounded" />
                    </div>

                    {/* Package Details & Booking Form */}
                    <div className="col-md-6">
                        <h2>{pkg.title}</h2>
                        <p className="text-muted">{pkg.city?.name}</p>
                        <p>{pkg.description}</p>
                        <p><strong>Price per person:</strong> ₹{pkg.price}</p>
                        <p><strong>Max persons allowed:</strong> {pkg.person}</p>

                        {/* Quantity Selector */}
                        <div className="mb-3 d-flex align-items-center">
                            <label className="me-3"><strong>Quantity:</strong></label>
                            <button
                                className="btn btn-outline-secondary"
                                onClick={() => handleQuantityChange(-1)}
                            >-</button>
                            <input
                                type="number"
                                readOnly
                                value={quantity}
                                className="form-control mx-2"
                                style={{ width: '60px', textAlign: 'center' }}
                            />
                            <button
                                className="btn btn-outline-secondary"
                                onClick={() => handleQuantityChange(1)}
                            >+</button>
                        </div>

                        {/* Booking Dates */}
                        <div className="mb-3">
                            <label className="form-label"><strong>Booking Start Date</strong></label>
                            <input
                                type="date"
                                className="form-control"
                                value={bookingDate}
                                onChange={(e) => setBookingDate(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label"><strong>Booking End Date</strong></label>
                            <input
                                type="date"
                                className="form-control"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>

                        {/* Total Price */}
                        <p><strong>Total Price:</strong> ₹{totalPrice}</p>

                        {/* Error or Success Messages */}
                        {error && <p className="text-danger">{error}</p>}
                        {success && <p className="text-success">{success}</p>}

                        {/* Book Now Button */}
                        <button className="btn btn-primary" onClick={handleBooking}>
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
