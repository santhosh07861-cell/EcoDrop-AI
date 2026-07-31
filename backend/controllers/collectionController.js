const dbStore = require('../config/db');

exports.createCollection = async (req, res) => {
  try {
    const { dropPointId, wasteCategory, estimatedWeight, photo, location } = req.body;
    const userId = req.user ? req.user.id : 'usr_citizen_demo';
    const userName = req.user ? req.user.name : 'Citizen User';

    let photoUrl = photo;
    if (req.file) {
      const host = req.get('host');
      photoUrl = `${req.protocol}://${host}/uploads/${req.file.filename}`;
    }

    const dropPoints = dbStore.findAll('droppoints');
    const targetPoint = dropPoints.find(dp => dp.dropPointId === dropPointId || dp.id === dropPointId) || dropPoints[0];

    const collectionCount = dbStore.findAll('collections').length + 1;
    const collectionId = `COL-2026-0${collectionCount + 890}`;

    // Weight to points calculation
    let weightKg = parseFloat(estimatedWeight) || 0.5;
    const pointsEarned = Math.max(30, Math.round(weightKg * 50));

    const newCollection = dbStore.create('collections', {
      collectionId,
      userId,
      userName,
      dropPointId: targetPoint ? targetPoint.dropPointId : 'DP-GVMC-001',
      dropPointName: targetPoint ? targetPoint.name : 'Siripuram Smart E-Waste Hub',
      ward: targetPoint ? targetPoint.ward : 'Ward 12',
      wasteCategory: wasteCategory || 'Mobile Phones & Accessories',
      estimatedWeight: typeof estimatedWeight === 'string' ? estimatedWeight : `${estimatedWeight} kg`,
      photo: photoUrl || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80',
      location: location || targetPoint.address,
      date: new Date().toISOString(),
      greenPointsEarned: pointsEarned,
      status: 'Pending Dispatch'
    });

    // Update user profile green points & stats
    const user = dbStore.findById('users', userId);
    if (user) {
      dbStore.update('users', userId, {
        greenPoints: (user.greenPoints || 0) + pointsEarned,
        totalSubmissions: (user.totalSubmissions || 0) + 1,
        co2SavedKg: parseFloat(((user.co2SavedKg || 0) + weightKg * 1.8).toFixed(1))
      });
    }

    return res.status(201).json({
      success: true,
      message: `E-waste submission logged! ${pointsEarned} Green Points added to your profile.`,
      collection: newCollection
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.getCollections = async (req, res) => {
  try {
    const collections = dbStore.findAll('collections');
    
    // Filter if user role is citizen
    if (req.user && req.user.role === 'citizen') {
      const userCollections = collections.filter(c => c.userId === req.user.id);
      return res.json({ success: true, collections: userCollections });
    }

    return res.json({ success: true, collections });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteCollection = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = dbStore.delete('collections', id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Collection record not found.' });
    }
    return res.json({ success: true, message: 'Collection record removed.', collection: deleted });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
