import Package from '../models/Package.js';

// Create Package
export const createPackage = async (req, res) => {
    try {
        const { title, description, person, price, city } = req.body;

        const domainName = req.protocol + '://' + req.get('host');
        const image = req.file
            ? `${domainName}/uploads/package/${req.file.filename}`
            : '';

        const pkg = new Package({
            title,
            description,
            person,
            price,
            image,
            city,
        });

        const newPackage = await pkg.save();
        res.status(201).json(newPackage);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create package', error: err.message });
    }
};

// Get All Packages
export const getPackages = async (req, res) => {
    try {
        const packages = await Package.find().populate('city', 'name');
        res.status(200).json(packages);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch packages', error: err.message });
    }
};

// Get Package by ID
export const getPackageById = async (req, res) => {
    try {
        const pkg = await Package.findById(req.params.id).populate('city', 'name');
        if (!pkg) return res.status(404).json({ message: 'Package not found' });
        res.status(200).json(pkg);
    } catch (err) {
        res.status(500).json({ message: 'Failed to get package', error: err.message });
    }
};

// Update Package
export const updatePackage = async (req, res) => {
    try {
        const { title, description, person, price, city, existingImage } = req.body;

        const pkg = await Package.findById(req.params.id);
        if (!pkg) return res.status(404).json({ message: 'Package not found' });

        // Determine final image path
        let image = pkg.image;
        const domainName = req.protocol + '://' + req.get('host');

        if (req.file) {
            image = `${domainName}/uploads/package/${req.file.filename}`;
        } else if (existingImage) {
            image = existingImage; // Trust only if your frontend sends it correctly
        }

        // Update only provided fields
        if (title !== undefined) pkg.title = title;
        if (description !== undefined) pkg.description = description;
        if (person !== undefined) pkg.person = person;
        if (price !== undefined) pkg.price = price;
        if (city !== undefined) pkg.city = city;
        pkg.image = image;

        const updatedPackage = await pkg.save();
        res.status(200).json(updatedPackage);
    } catch (err) {
        console.error('Update Package Error:', err);
        res.status(500).json({ message: 'Failed to update package', error: err.message });
    }
};

// Delete Package
export const deletePackage = async (req, res) => {
    try {
        const pkg = await Package.findById(req.params.id);
        if (!pkg) return res.status(404).json({ message: 'Package not found' });

        await pkg.deleteOne();
        res.status(200).json({ message: 'Package deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete package', error: err.message });
    }
};
