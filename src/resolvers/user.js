import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server';

export default {
  Query: {
    user: async (parent, { id }, { models }, info) => {
      console.log('model', models.userModel);
      const user = await models.userModel.findById({ _id: id });
      console.log('user', user);
      return user;
    },
  },
  Mutation: {
    createUser: async (parent, { name, email, password }, { models, secret }, info) => {
      const user = await models.userModel.create({ name, email, password });
      const token = jwt.sign({ id: user.id }, secret, { expiresIn: 24 * 10 * 50 });
      return { token };
    },
    login: async (parent, { email, password }, { models, secret }, info) => {
      const user = await models.userModel.findOne({ email }).exec();

      if (!user) {
        throw new AuthenticationError('Invalid credentials');
      }

      const matchPasswords = bcrypt.compareSync(password, user.password);

      if (!matchPasswords) {
        throw new AuthenticationError('Invalid credentials');
      }

      const token = jwt.sign({ id: user.id }, secret, { expiresIn: 24 * 10 * 50 });

      return {
        token,
      };
    },
  },
  User: {
    feeds: async ({ id }, args, { models }, info) => {
      const feeds = await models.feedModel.find({ user: id }).exec();
      return feeds;
    },
  },
};
