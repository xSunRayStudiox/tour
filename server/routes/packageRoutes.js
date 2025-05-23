import express from 'express';
import {
    createPackage,
    getPackages,
    getPackageById,
    updatePackage,
    deletePackage
} from '../controllers/packageController.js';
import { uploadImage } from '../middleware/upload.js';

const router = express.Router();

router.get('/', getPackages);
router.get('/:id', getPackageById);
router.post('/', uploadImage.single('image'), createPackage);
router.put('/:id', uploadImage.single('image'), updatePackage);
router.delete('/:id', deletePackage);

export default router;
