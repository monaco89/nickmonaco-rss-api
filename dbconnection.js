import mongoose from 'mongoose';

mongoose.set('debug', true);
let cachedConnection = null;

function initConnection() {
  if (cachedConnection === null) {
    return mongoose
      .createConnection(process.env.PROD_MONGODB_URI, {
        bufferCommands: false,
        bufferMaxEntries: 0,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      })
      .then(async (connection) => {
        // console.log('connection', connection);
        cachedConnection = connection;
        console.log('connected to mongo');
        return cachedConnection;
      });
  } else {
    console.log('using cached connection');
    return Promise.resolve(cachedConnection);
  }
}

export default initConnection;
