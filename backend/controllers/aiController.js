const { classifyEWasteImage } = require('../services/geminiService');

exports.analyzeWasteImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload an image file.' });
    }

    const imagePath = req.file.path;
    const mimeType = req.file.mimetype;

    const aiResult = await classifyEWasteImage(imagePath, mimeType);

    // Build complete client URL for the uploaded photo
    const host = req.get('host');
    const protocol = req.protocol;
    const photoUrl = `${protocol}://${host}/uploads/${req.file.filename}`;

    return res.json({
      success: true,
      analysis: {
        ...aiResult,
        photoUrl,
        filename: req.file.filename
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
