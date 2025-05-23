import City from '../models/City.js';
import { deleteImage } from '../utils/deleteImage.js';

// Helper to build full image URL
const getDomainUrl = (req) => req.protocol + "://" + req.get("host");

// @desc    Create a new city
export const createCity = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name || name.trim() === '') {
            return res.status(400).json({ error: 'City name is required' });
        }

        const existing = await City.findOne({ name });
        if (existing) {
            return res.status(400).json({ error: 'City name already exists' });
        }

        const image = req.file ? `${getDomainUrl(req)}/uploads/cities/${req.file.filename}` : "";
        const city = new City({ name, image });

        await city.save();
        res.status(201).json(city);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Update a city by ID
export const updateCity = async (req, res) => {
    try {
        const { name } = req.body;
        const city = await City.findById(req.params.id);

        if (!city) return res.status(404).json({ error: 'City not found' });

        if (name && name !== city.name) {
            const existing = await City.findOne({ name });
            if (existing) return res.status(400).json({ error: 'City name already exists' });
        }

        let image;
        if (req.file) {
            if (city.image) deleteImage(city.image);
            image = `${getDomainUrl(req)}/uploads/cities/${req.file.filename}`;
        }

        city.name = name || city.name;
        if (image) city.image = image;

        await city.save();
        res.status(200).json(city);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Get a city by ID
export const getCityById = async (req, res) => {
    try {
        const city = await City.findById(req.params.id);
        if (!city) {
            return res.status(404).json({ error: 'City not found' });
        }
        res.status(200).json(city);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Get all cities (with optional pagination)
export const getAllCities = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const cities = await City.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
        const total = await City.countDocuments();

        res.status(200).json({
            cities,
            total,
            page,
            pages: Math.ceil(total / limit)
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Delete a city by ID
export const deleteCity = async (req, res) => {
    try {
        const city = await City.findById(req.params.id);
        if (!city) return res.status(404).json({ error: 'City not found' });

        if (city.image) deleteImage(city.image);
        await city.deleteOne();

        res.status(200).json({ message: 'City deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
