import { useEffect, useState } from 'react';
import useBookings from '../../api/useBookings';

export default function BookingList() {
  const {
    bookings,
    loading,
    fetchAllBookings,
    removeBooking,
    updateStatus,
  } = useBookings();

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchAllBookings();
  }, []);

  const openEditModal = (booking) => {
    setSelectedBooking({ ...booking }); // make a copy
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedBooking((prev) => ({ ...prev, [name]: value }));
  };

 const handleUpdate = async () => {
  await updateStatus(selectedBooking._id, selectedBooking.status);
  setShowModal(false);
  fetchAllBookings();
};


  return (
    <div className="container py-4">
      <h2 className="h4 mb-4">Bookings</h2>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center py-5">
          Loading...
        </div>
      ) : (
        <div className="row">
          {bookings.map((booking) => (
            <div key={booking._id} className="col-12 col-md-4 mb-4 bg-black">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">
                    {booking.package?.title || 'Untitled Package'}
                  </h5>
                  <p className="card-text"><strong>City:</strong> {booking.city?.name}</p>
                  <p className="card-text"><strong>Guests:</strong> {booking.quantity}</p>
                  <p className="card-text"><strong>Start:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
                  <p className="card-text"><strong>End:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
                  <p className="card-text"><strong>Total:</strong> ₹{booking.totalPrice}</p>
                  <p className="card-text">
                    <strong>Status:</strong>{' '}
                    <span className="text-uppercase fw-bold">{booking.status}</span>
                  </p>
                </div>
                <div className="card-footer d-flex justify-content-between">
                  <button className="btn btn-primary" onClick={() => openEditModal(booking)}>
                    Edit
                  </button>
                  <button className="btn btn-danger" onClick={() => removeBooking(booking._id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && selectedBooking && (
        <EditBookingModal
          booking={selectedBooking}
          onClose={() => setShowModal(false)}
          onChange={handleInputChange}
          onSave={handleUpdate}
        />
      )}
    </div>
  );
}

// Modal Component
function EditBookingModal({ booking, onClose, onChange, onSave }) {
  return (
    <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update Booking Status</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Status</label>
              <select
                name="status"
                className="form-select"
                value={booking.status}
                onChange={onChange}
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button className="btn btn-success" onClick={onSave}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}

