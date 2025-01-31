const express = require('express');
const router = express.Router();
const tentaController = require('../controllers/tentaController');
const verifyJWT = require('../middleware/verifyJWT')

//router.use(verifyJWT)

router.route('/')
    .get(tentaController.getAllTentor)
    .post(tentaController.createNewTenta)
    .patch(tentaController.updateTenta)
    .delete(tentaController.deleteTenta)

module.exports = router;
