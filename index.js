import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { ApolloServer, AuthenticationError } from 'apollo-server-lambda';

import schemas from './src/schemas';
import resolvers from './src/resolvers';

import userModel from './src/models/user';
import feedModel from './src/models/feed';

dotenv.config();

let originDomain = '*';

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
    settings: {
      'request.credentials': 'same-origin',
    },
  },
  context: async ({ req, context }) => {
    context.callbackWaitsForEmptyEventLoop = false;
    if (req) {
      const me = await getUser(req);

      return {
        ...context,
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

let cachedDb = null;

function connectToDatabase(uri) {
  console.log('=> connect to database');

  if (cachedDb) {
    console.log('=> using cached database instance');
    return Promise.resolve(cachedDb);
  }

  const connection = mongoose.connect(uri, {
    autoIndex: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    poolSize: 50,
    bufferMaxEntries: 0,
    keepAlive: 120,
    useNewUrlParser: true,
  });

  mongoose.set('useCreateIndex', true);

  return connection
    .then((db) => {
      cachedDb = db;
      return cachedDb;
    })
    .catch((err) => {
      console.log(err);
    });
}

// connectToDatabase(process.env.PROD_MONGODB_URI).then((db) => console.log(`connected to db`));

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
  .then((db) => {
    cachedDb = db;
    return cachedDb;
  })
  .catch((err) => {
    console.log(err);
  });

exports.graphqlHandler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
  },
  // cors: {
  //   origin: originDomain,
  //   credentials: true,
  //   methods: 'POST, GET, OPTIONS',
  //   allowedHeaders: ['Content-Type', 'X-Amz-Date', 'Authorization', 'X-Api-Key', 'X-Amz-Security-Token', 'x-token'],
  // },
  // endpointURL: '/graphql',
});
