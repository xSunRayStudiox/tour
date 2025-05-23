// routes/bookingRoutes.js
import express from 'express';
import {
    createBooking,
    deleteBooking,
    updateBookingStatus,
    getAllBookings,
    getUserBookings,
    getBookingById
} from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createBooking);
router.get('/', getAllBookings); // admin check to be handled
router.get('/user', getUserBookings);
router.get('/:id', getBookingById);
router.put('/:id/status', protect, updateBookingStatus); // admin check to be handled
router.delete('/:id', protect, deleteBooking);

export default router;
