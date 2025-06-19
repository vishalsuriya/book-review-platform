const  express = require("express");
const router = express.Router();
const {postBook,getBook,getSpecificBook,addReview} = require("../Controller/BookController");
router.route("/post-book").post(postBook);
router.route("/get-book").get(getBook);
router.route("/book-details/:id").get(getSpecificBook);
router.route("/:id/add-review").post(addReview)



module.exports = router;