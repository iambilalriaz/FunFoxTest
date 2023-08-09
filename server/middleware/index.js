import User from '../models/user.js';

export const detectUserGroup = async (req, res, next) => {
  const userId = req.headers.user_id;

  if (!userId) {
    return res.status(400).json({ message: 'User ID not specified.' });
  }
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    req.userGroup = user.group;
    req.userEmail = user.email;
    next();
  } catch {
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
