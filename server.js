import jwt from 'jsonwebtoken';
import { ApolloServer, AuthenticationError } from 'apollo-server-lambda';

import schemas from './src/schemas';
import resolvers from './src/resolvers';

import userModel from './src/models/user';
import feedModel from './src/models/feed';

const getUser = async (req) => {
  const token = req.headers['x-token'];
  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET);
    } catch (e) {
      throw new AuthenticationError('Your session expired. Sign in again.');
    }
  }
};

const server = new ApolloServer({
  typeDefs: schemas,
  resolvers,
  introspection: true,
  // playground: process.env.NODE_ENV === 'dev' ? true : false,
  playground: {
    endpoint: '/dev/graphql',
    // settings: {
    //   'request.credentials': 'same-origin',
    // },
  },
  context: async ({ req }) => {
    if (req) {
      const me = await getUser(req);

      return {
        me,
        models: {
          userModel,
          feedModel,
        },
        secret: process.env.SECRET,
      };
    }
  },
});

export default server;
