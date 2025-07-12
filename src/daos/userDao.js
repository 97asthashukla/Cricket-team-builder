const { User } = require('../../models');

const createUser = async (userData) => {
  const { email, password } = userData;
  return await User.create({ email, password });
};

const findUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

module.exports = {
  createUser,
  findUserByEmail,
};
