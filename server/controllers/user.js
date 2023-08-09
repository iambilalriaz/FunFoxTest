import User from '../models/user.js';

export const userLogin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const appUser = await User.findOne({ email: email, password: password });
  if (!appUser) {
    return res.status(404).json({ message: 'Invalid credentials.' });
  }
  return res.status(200).json(appUser);
};

export const userSignup = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const group = req.body.group;
  if (!email || !password || !group) {
    return res
      .status(400)
      .json({ message: 'Please enter all required fields.' });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists.' });
    }
    if (password?.length < 6) {
      return res
        .status(400)
        .json({ message: 'Password should be at least 6 characters long.' });
    }
    const newUser = new User({ email, password, group });
    await newUser.save();
    return res.status(201).json({ message: 'User created successfully.' });
  } catch {
    return res.status(500).json({ message: 'Something went wrong.' });
  }
};
