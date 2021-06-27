import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-lambda';
import { getUser, createUser, getUserByEmail } from '../queries/user';
import { getFeedByUserId } from '../queries/feed';
import { handleError } from '../utils';

function generatePasswordHash(password) {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

export default {
  Query: {
    user: async (parent, { id }) => {
      try {
        const user = await getUser(id);
        return user;
      } catch (err) {
        handleError(err);
      }
    },
    me: async (parent, args, { me }) => {
      if (!me) {
        return null;
      }

      try {
        const user = await getUser(me.id);
        return user;
      } catch (err) {
        handleError(err);
      }
    },
  },
  Mutation: {
    createUser: async (parent, { name, email, password }, { secret }) => {
      try {
        const hashed = await generatePasswordHash(password);
        const user = await createUser({
          name,
          email,
          password: hashed,
        });
        const token = jwt.sign({ id: user.id }, secret, {
          expiresIn: 24 * 10 * 50,
        });
        return { token };
      } catch (err) {
        handleError(err);
      }
    },
    login: async (parent, { email, password }, { secret }) => {
      try {
        const user = await getUserByEmail(email);

        if (!user) {
          throw new AuthenticationError('Invalid credentials');
        }

        // compareSync vs compare?
        const matchPasswords = bcrypt.compareSync(password, user[0].password);

        if (!matchPasswords) {
          throw new AuthenticationError('Invalid credentials');
        }

        const token = jwt.sign({ id: user[0].id }, secret, {
          expiresIn: 24 * 10 * 50,
        });

        return {
          token,
        };
      } catch (err) {
        handleError(err);
      }
    },
  },
  User: {
    feeds: async ({ id }) => {
      try {
        const feeds = await getFeedByUserId(id);
        return feeds;
      } catch (err) {
        handleError(err);
      }
    },
  },
};
