import express from 'express';
import {
   createOffer,
   getAllOffers,
   getOfferById,
   updateOffer,
   deleteOffer,
} from '../controllers/offerController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', createOffer);
router.get('/', getAllOffers);
router.get('/:id', getOfferById);
router.put('/:id', protect, adminOnly, updateOffer);
router.delete('/:id', protect, adminOnly, deleteOffer);

export default router;
