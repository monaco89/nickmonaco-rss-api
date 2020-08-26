import mongoose from 'mongoose';

mongoose.set('debug', true);
let cachedConnection = null;

function initConnection() {
  if (cachedConnection === null) {
    return mongoose
      .connect(process.env.PROD_MONGODB_URI, {
        autoIndex: true,
        // reconnectTries: Number.MAX_VALUE,
        reconnectTries: 5,
        reconnectInterval: 500,
        poolSize: 50,
        bufferMaxEntries: 0,
        keepAlive: 120,
        useNewUrlParser: true,
      })
      .then(async (connection) => {
        // console.log('connection', connection);
        cachedConnection = connection;
        // console.log('connected to mongo');
        return cachedConnection;
      });
  } else {
    // console.log('using cached connection');
    return Promise.resolve(cachedConnection);
  }
}

export default initConnection;
