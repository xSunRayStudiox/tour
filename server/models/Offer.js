import mongoose from 'mongoose';

const offerSchema = new mongoose.Schema({
   title: {
      type: String,
      required: true,
   },
   description: {
      type: String,
      required: true,
   },
   type: {
      type: String,
      enum: ['Percent', 'Fixed'],
      default: 'Percent',
      required: true,
   },
   percent: {
      type: Number,
   },
   fixed: {
      type: Number,
   },
   code: {
      type: String,
   },
}, { timestamps: true });

export default mongoose.model('Offers', offerSchema);