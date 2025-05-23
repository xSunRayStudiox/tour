import Booking from '../models/Booking.js';
import Package from '../models/Package.js';

// Create a new booking
export const createBooking = async (req, res) => {
    try {
        const { package: packageId, bookingDate, EndDate, city, quantity, payId } = req.body;

        const travelPackage = await Package.findById(packageId);
        if (!travelPackage)
            return res.status(404).json({ message: 'Package not found' });

        const totalPrice = travelPackage.price * (quantity || 1);

        const booking = new Booking({
            user: req.user.id,
            package: packageId,
            bookingDate,
            EndDate,
            city,
            quantity,
            totalPrice,
            payId,
        });


        const savedBooking = await booking.save();
        res.status(201).json(savedBooking);
    } catch (err) {
        res.status(500).json({ message: 'Failed to book package', error: err.message });
    }
};

// Get all bookings (Admin only) with user name & email
export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('user', 'name email')
            .populate('package')
            .populate('city', 'name');
        res.status(200).json(bookings);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch bookings', error: err.message });
    }
};

// Get bookings for logged-in user
export const getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id }).populate('package');
        res.status(200).json(bookings);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch user bookings', error: err.message });
    }
};

// Get booking by ID with user and package info
export const getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate('user', 'name email')
            .populate('package');

        if (!booking)
            return res.status(404).json({ message: 'Booking not found' });

        // User can only see their own booking unless admin
        if (booking.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to view this booking' });
        }

        res.status(200).json(booking);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch booking', error: err.message });
    }
};

// Update booking status (Admin only)
export const updateBookingStatus = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking)
            return res.status(404).json({ message: 'Booking not found' });

        booking.status = req.body.status || booking.status;
        const updatedBooking = await booking.save();

        res.status(200).json(updatedBooking);
    } catch (err) {
        res.status(500).json({ message: 'Failed to update booking', error: err.message });
    }
};

// Delete booking (user can delete their own or admin can delete any)
export const deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking)
            return res.status(404).json({ message: 'Booking not found' });

        if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await Booking.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete booking', error: err.message });
    }
};
