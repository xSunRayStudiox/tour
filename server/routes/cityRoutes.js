import express from 'express';
import { adminOnly, protect } from '../middleware/authMiddleware.js';
import { uploadImage } from '../middleware/upload.js';
import { createCity, deleteCity, getAllCities, getCityById, updateCity } from '../controllers/CityController.js';

const router = express.Router();

router.get('/', getAllCities);
router.post('/', protect, adminOnly, uploadImage.single('image'), createCity);
router.put('/:id', protect, adminOnly, uploadImage.single('image'), updateCity);
router.get('/:id', getCityById);
router.delete('/:id', protect, adminOnly, deleteCity);

export default router;
