const dbStore = require('../config/db');

exports.createComplaint = async (req, res) => {
  try {
    const { type, description, location, dropPointId } = req.body;
    const userId = req.user ? req.user.id : 'usr_citizen_demo';
    const userName = req.user ? req.user.name : 'Resident of Visakhapatnam';

    let photoUrl = 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=400&q=80';
    if (req.file) {
      const host = req.get('host');
      photoUrl = `${req.protocol}://${host}/uploads/${req.file.filename}`;
    } else if (req.body.photo) {
      photoUrl = req.body.photo;
    }

    const complaintCount = dbStore.findAll('complaints').length + 1;
    const complaintId = `CMP-GVMC-${100 + complaintCount}`;

    const newComplaint = dbStore.create('complaints', {
      complaintId,
      userId,
      userName,
      type: type || 'Overflowing Bin',
      description: description || 'E-waste drop point needs immediate inspection.',
      photo: photoUrl,
      location: location || 'Visakhapatnam Ward Area',
      dropPointId: dropPointId || null,
      status: 'Pending Investigation',
      assignedOfficer: 'GVMC Health Inspector',
      date: new Date().toISOString()
    });

    return res.status(201).json({
      success: true,
      message: 'Complaint submitted to GVMC Public Health & Solid Waste Management department.',
      complaint: newComplaint
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.getComplaints = async (req, res) => {
  try {
    const complaints = dbStore.findAll('complaints');
    if (req.user && req.user.role === 'citizen') {
      const citizenComplaints = complaints.filter(c => c.userId === req.user.id);
      return res.json({ success: true, complaints: citizenComplaints });
    }
    return res.json({ success: true, complaints });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateComplaintStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, assignedOfficer } = req.body;

    const updated = dbStore.update('complaints', id, {
      status: status || 'Resolved',
      ...(assignedOfficer ? { assignedOfficer } : {})
    });

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Complaint record not found.' });
    }

    return res.json({
      success: true,
      message: `Complaint #${updated.complaintId} status updated to '${updated.status}'`,
      complaint: updated
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = dbStore.delete('complaints', id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Complaint record not found.' });
    }
    return res.json({ success: true, message: 'Complaint deleted.', complaint: deleted });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
