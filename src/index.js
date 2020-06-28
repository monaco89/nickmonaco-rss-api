import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { ApolloServer, AuthenticationError } from 'apollo-server-lambda';

import schemas from './schemas';
import resolvers from './resolvers';

import userModel from './models/user';
import feedModel from './models/feed';

dotenv.config();

let originDomain = '*';

const app = express();
app.use(cors());

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
        secret: process.env.SECRET,
      };
    }
  },
});

const connection = mongoose.connect(process.env.PROD_MONGODB_URI, {
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

exports.graphqlHandler = server.createHandler({
  cors: {
    origin: originDomain,
    credentials: false,
  },
  endpointURL: '/graphql',
});
