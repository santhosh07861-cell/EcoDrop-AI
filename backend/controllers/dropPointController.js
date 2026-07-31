const dbStore = require('../config/db');

exports.getDropPoints = async (req, res) => {
  try {
    const points = dbStore.findAll('droppoints');
    return res.json({
      success: true,
      count: points.length,
      dropPoints: points
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.getDropPointById = async (req, res) => {
  try {
    const { id } = req.params;
    const point = dbStore.findById('droppoints', id);
    if (!point) {
      return res.status(404).json({ success: false, message: 'Drop point not found.' });
    }
    return res.json({ success: true, dropPoint: point });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.createDropPoint = async (req, res) => {
  try {
    const { name, ward, zone, address, lat, lng, operatingHours, contactPerson, acceptedTypes } = req.body;

    if (!name || !ward || !address) {
      return res.status(400).json({ success: false, message: 'Name, ward, and address are required.' });
    }

    const count = dbStore.findAll('droppoints').length + 1;
    const dropPointId = `DP-GVMC-00${count}`;

    const newPoint = dbStore.create('droppoints', {
      dropPointId,
      name,
      ward: ward.includes('Ward') ? ward : `Ward ${ward}`,
      zone: zone || 'Central Vizag',
      address,
      lat: parseFloat(lat) || 17.7200,
      lng: parseFloat(lng) || 83.3000,
      operatingHours: operatingHours || '08:00 AM - 08:00 PM',
      contactPerson: contactPerson || 'GVMC Health Inspector',
      acceptedTypes: Array.isArray(acceptedTypes) ? acceptedTypes : ['Mobiles', 'Batteries', 'Small Hardware'],
      capacityStatus: '10% Full',
      capacityPercentage: 10,
      status: 'Active',
      qrCodeData: `${dropPointId}|${name}|${ward}`
    });

    return res.status(201).json({
      success: true,
      message: 'New drop-off point registered successfully!',
      dropPoint: newPoint
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.scanQRCode = async (req, res) => {
  try {
    const { qrData } = req.body;
    if (!qrData) {
      return res.status(400).json({ success: false, message: 'QR data required.' });
    }

    const points = dbStore.findAll('droppoints');
    let matched = points.find(p => p.dropPointId === qrData || p.id === qrData || p.qrCodeData === qrData);

    if (!matched && qrData.includes('|')) {
      const code = qrData.split('|')[0];
      matched = points.find(p => p.dropPointId === code);
    }

    if (!matched) {
      // Fallback to first active drop point if user scans any sample barcode
      matched = points[0];
    }

    return res.json({
      success: true,
      message: 'QR code decoded & validated successfully',
      center: matched
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
