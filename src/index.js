import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';

import schemas from './schemas';
import resolvers from './resolvers';

import userModel from './models/userModel';
import feedModel from './models/feedModel';

dotenv.config();

const app = express();
app.use(cors());

const SECRET = 'yankees2020Champions';

const getUser = async (req) => {
  const token = req.headers['token'];

  if (token) {
    try {
      return await jwt.verify(token, SECRET);
    } catch (e) {
      throw new AuthenticationError('Your session expired. Sign in again.');
    }
  }
};

const server = new ApolloServer({
  typeDefs: schemas,
  resolvers,
  playground: process.env.NODE_ENV === 'development' ? true : false,
  context: async ({ req }) => {
    if (req) {
      const me = await getUser(req);

      return {
        me,
        models: {
          userModel,
          feedModel,
        },
        secret: SECRET,
      };
    }
  },
});

server.applyMiddleware({ app, path: '/graphql' });

const connection = mongoose.connect(process.env.MONGODB_URI, {
  autoIndex: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  poolSize: 50,
  bufferMaxEntries: 0,
  keepAlive: 120,
  useNewUrlParser: true,
});

mongoose.set('useCreateIndex', true);

connection
  .then((db) => db)
  .catch((err) => {
    console.log(err);
  });

app.listen({ port: process.env.PORT }, () => {
  console.log(`🚀 Server listening on port ${process.env.PORT}/graphql`);
});
