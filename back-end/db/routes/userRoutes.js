// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers.js');


router.post('/user', userController.createUser);
router.get('/user/:id',userController.getUserById)
router.get('/user',userController.getUsers)
router.delete('/user/:id',userController.deleteUser)
router.put('/user/:id',userController.updateUser)

module.exports = router;
