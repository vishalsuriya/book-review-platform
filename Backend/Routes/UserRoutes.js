const  express = require("express");
const {register,login, getProfile,logout,updateProfile} = require("../Controller/UserController")
const router = express.Router();
const {protect} = require("../Middleware/AuthMiddleware");
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/profile").get(protect, getProfile);
router.route("/logout").post(logout);
router.route("/updateProfile").put(protect,updateProfile)

module.exports = router;