import Offer from '../models/Offer.js';

// Create
export const createOffer = async (req, res) => {
   try {
      const offer = await Offer.create(req.body);
      res.status(201).json(offer);
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
};

// Read All
export const getAllOffers = async (req, res) => {
   try {
      const offers = await Offer.find().sort({ createdAt: -1 });
      res.status(200).json(offers);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};

// Read One
export const getOfferById = async (req, res) => {
   try {
      const offer = await Offer.findById(req.params.id);
      if (!offer) return res.status(404).json({ error: 'Offer not found' });
      res.status(200).json(offer);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};

// Update
export const updateOffer = async (req, res) => {
   try {
      const offer = await Offer.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!offer) return res.status(404).json({ error: 'Offer not found' });
      res.status(200).json(offer);
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
};

// Delete
export const deleteOffer = async (req, res) => {
   try {
      const offer = await Offer.findByIdAndDelete(req.params.id);
      if (!offer) return res.status(404).json({ error: 'Offer not found' });
      res.status(200).json({ message: 'Offer deleted' });
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};
