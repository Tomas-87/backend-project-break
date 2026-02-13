const User = require("../models/User"),
  bcrypt = require("bcrypt"),
  jwt = require("jsonwebtoken");

const apiAuthControler = {
  apiLogin: async (req, res) => {
    try {
      const { user, password } = req.body;

      if (!user || !password) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }
      const userDB = await User.findOne({ user });
      if (!userDB) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }
      const match = await bcrypt.compare(password, userDB.password);
      if (!match) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      const token = jwt.sign(
        { id: userDB._id, role: userDB.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
      );

      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  apiRegister: async (req, res) => {
    try {
      const { user, password } = req.body;

      if (!user || !password) {
        return res.status(400).json({ message: "Rquiered user and password" });
      }

      const userExist = await User.findOne({ user });
      if (userExist) {
        return res.status(400).json({ message: "User already exist" });
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        user,
        password: hashPassword,
        role: "client",
      });
      res.status(201).json({
        message: "User Created",
        user: {
          id: newUser._id,
          role: newUser.role,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = apiAuthControler;
