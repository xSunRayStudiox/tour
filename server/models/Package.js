import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    person: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    views: {
        type: Number,
    },
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City'
    },
}, { timestamps: true });

export default mongoose.model('Package', packageSchema);