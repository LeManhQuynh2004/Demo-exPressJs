const userController = require("../controllers/userController");

const router = require("express").Router();

//GET USER
router.get('/', userController.getAllUser)

//POST USER
router.post('/', userController.addUser)

//GET AN USER 
router.get('/:id', userController.getAnUser)

//UPDATE USER
router.put('/:id', userController.updateUser)

//DELETE USER
router.delete('/:id', userController.deleteUser)

module.exports = router