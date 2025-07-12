const { userDao } = require('../daos');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { USER_MESSAGES } = require('../constants/messages');

const register = async (email, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userDao.createUser({ email, password: hashedPassword });
    const { id } = user;
    return { id, email };
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      const field = error.errors && error.errors.length > 0 ? error.errors[0].path : 'unknown';
      switch (field) {
        case 'email':
          throw new Error(USER_MESSAGES.EMAIL_ALREADY_REGISTERED);
        default:
          throw new Error(`${USER_MESSAGES.VALIDATION_FAILED} Duplicate entry for ${field}.`);
      }
    } else if (error.name === 'SequelizeValidationError') {
      const validationErrors = error.errors.map(err => err.message);
      throw new Error(`${USER_MESSAGES.VALIDATION_FAILED} ${validationErrors.join(', ')}`);
    }
    throw new Error(USER_MESSAGES.FAILED_TO_REGISTER_USER);
  }
};

const login = async (email, password) => {
  const user = await userDao.findUserByEmail(email);
  if (!user) {
    throw new Error(USER_MESSAGES.INVALID_CREDENTIALS);
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error(USER_MESSAGES.INVALID_CREDENTIALS);
  }
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  return token;
};

module.exports = {
  register,
  login,
};
