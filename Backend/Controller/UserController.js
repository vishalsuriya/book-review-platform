const User = require("../Schemas/UserSchema");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    if (newUser) {
      generateToken(res, newUser._id);

      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        pic: newUser.pic,
      });
    } else {
      res.status(400).json({ message: "User creation failed" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    const isMatch = await bcrypt.compare(password, user.password);

    if(!user || !isMatch) {
      return res
        .status(401)
        .json({ message: "Invalid email or password" });
    }

    generateToken(res, user._id); 

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
const getProfile = async (req, res) => {
  res.json(req.user); 
};
const logout = async(req,res)=>{
  res.clearCookie("jwt");
  res.json({ message : "Logged out sucessfully"});
}
const updateProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, 12);
    }
    if (req.body.pic) {
      user.pic = req.body.pic; 
      
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      pic: updatedUser.pic,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};


module.exports = { register, login,getProfile,logout, updateProfile};
