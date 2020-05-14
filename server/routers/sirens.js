const express = require('express');
const sirensController = require('../controllers/sirens');
const router = express.Router();

router.get('/range/:start/:end', sirensController.getSirensByDateRange);
router.get('/id/:siren_id', sirensController.getSirensByID);
router.post('/', sirensController.addSiren);


module.exports = router;