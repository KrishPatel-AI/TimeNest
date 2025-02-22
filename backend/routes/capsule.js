const express = require('express');
const router = express.Router();
const capsuleController = require('../controllers/capsuleController'); // Check if the correct path is used

// Ensure that the function exists in the controller
router.post('/create', capsuleController.createCapsule); // make sure the method exists

module.exports = router;
