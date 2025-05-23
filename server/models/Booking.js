import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    package: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Package',
        required: true
    },
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City',
        required: true
    },
    bookingDate: {
        type: Date,
        required: true
    },
    EndDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending',
    },
    quantity: {
        type: Number,
    },
    totalPrice: {
        type: Number,
    },
    payId: {
        type: String,
    },
}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema);
