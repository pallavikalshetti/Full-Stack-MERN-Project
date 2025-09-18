const User = require('../models/User-model');
const jwt = require('jsonwebtoken');

const generateToken = (userId) =>
  jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ msg:'User already exists' });

    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);
    res.status(201).json({ token, user: { id: user._id, name: user.name } });
  } catch (err) {
    res.status(500).json({ msg: 'Server error'});
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password)))
      return res.status(401).json({ msg:'Invalid credentials'});

    const token = generateToken(user._id);
    res.status(201).json({ token, user: { id: user._id, name: user.name } });
  } catch (err) {
    res.status(500).json({ msg:'Server error'});
  }
};