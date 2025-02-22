const Capsule = require('../models/Capsule');  // Ensure the model is correctly imported

// Example createCapsule function
exports.createCapsule = async (req, res) => {
  try {
    const { title, content, unlockDate } = req.body;
    
    const newCapsule = new Capsule({
      title,
      content,
      unlockDate,
      createdAt: new Date(),
    });

    await newCapsule.save();
    res.status(201).json(newCapsule);  // Respond with the created capsule
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create capsule' });
  }
};
