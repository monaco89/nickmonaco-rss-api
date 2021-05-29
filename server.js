import jwt from 'jsonwebtoken';
import { ApolloServer } from 'apollo-server-lambda';
import schemas from './src/schemas';
import resolvers from './src/resolvers';
import { config } from './src/store/config';

const getMe = (req) => {
  const token = req.headers['x-token'];
  if (token) {
    try {
      // Return auth0 token, or jwt token with normal signin
      return token.startsWith('auth0') || token.startsWith('google-oauth2')
        ? token.split('|')[1]
        : jwt.verify(token, config.env.secret);
    } catch (e) {
      // throw new AuthenticationError('Your session expired. Sign in again.');
      return null;
    }
  }
};

const server = new ApolloServer({
  typeDefs: schemas,
  resolvers,
  introspection: true,
  context: ({ event, context }) => {
    const me = getMe(event);

    return {
      me,
      secret: config.env.secret,
      ...context,
      // headers: {
      //   headers: req.headers,
      //   ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      // },
    };
  },
});

export default server;
