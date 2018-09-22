import { User } from '../models';
import bcrypt from 'bcrypt';
import { Utils, ResponseMessage } from 'utils';
require('dotenv').config();

const resolvers = {
  Mutation: {
    async register(_, { firstName, lastName, email, password }) {
      const validEmail = Utils.validateEmail(email);
      if (!validEmail) {
        throw new Error(ResponseMessage.MESSAGE_INVALID_EMAIL);
      }
      const checkUser = await User.findOne({ where: { email } });
      if (checkUser) {
        throw new Error(ResponseMessage.MESSAGE_EMAIL_ALREADY_IN_USE);
      }
      const createdUser = await User.create({
        firstName,
        lastName,
        email,
        password: await bcrypt.hash(password, 10)
      });
      return createdUser;
    },

    async login(_, { email, password }) {
      const validEmail = Utils.validateEmail(email);
      if (!validEmail) {
        throw new Error(ResponseMessage.MESSAGE_INVALID_EMAIL);
      }
      const userExist = await User.findOne({ where: { email } });
      if (!userExist) {
        throw new Error(ResponseMessage.MESSAGE_LOGIN_FAILED);
      }
      const valid = await bcrypt.compare(password, userExist.password);
      if (!valid) {
        throw new Error(ResponseMessage.MESSAGE_WRONG_PASSWORD);
      }
      return `Hello ${userExist.firstName} ${userExist.lastName}`;
    }
  }
};

export default resolvers;
