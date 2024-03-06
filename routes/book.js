const bookController = require("../controllers/bookController");

const router = require("express").Router();

//POST BOOK
router.post('/', bookController.addBook);

//GET BOOK
router.get('/', bookController.getAllBook);

//GET AN BOOK
router.get("/:id", bookController.getAnBook)

//UPDATE BOOK
router.put("/:id",bookController.updateBook)

//DELETE BOOK
router.delete("/:id",bookController.deleteBook)

module.exports = router;