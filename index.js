import 'source-map-support/register';
import server from './server';
import { config } from './src/store/config';

// exports.graphqlHandler = (event, context, callback) => {
//     context.callbackWaitsForEmptyEventLoop = false;
//     const callbackFilter = function (error, output) {
//         output.headers['Strict-Transport-Security'] =
//             'max-age=31536000; includeSubDomains; preload';
//         output.headers['X-Content-Type-Options'] = 'nosniff';
//         output.headers['X-Permitted-Cross-Domain-Policies'] = 'none';
//         output.headers['Referrer-Policy'] = 'no-referrer-when-downgrade';
//         output.headers['X-Frame-Options'] = 'DENY';
//         output.headers['X-XSS-Protection'] = '1; mode=block';
//         output.headers['X-Download-Options'] = 'noopen';
//         output.headers['X-Generator'] = 'deny';
//         callback(error, output);
//     };

//     server.createHandler({
//         cors: {
//             origin: config.env.originDomain,
//             credentials: true,
//             methods: 'POST, GET, OPTIONS',
//             allowedHeaders: [
//                 'Content-Type',
//                 'X-Amz-Date',
//                 'Authorization',
//                 'X-Api-Key',
//                 'X-Amz-Security-Token',
//                 'x-token',
//             ],
//         },
//     })(event, context, callbackFilter);
// };

const options = {
  cors: {
    origin: config.env.originDomain,
    credentials: true,
    methods: 'POST, GET, OPTIONS',
    allowedHeaders: [
      'Content-Type',
      'X-Amz-Date',
      'Authorization',
      'X-Api-Key',
      'X-Amz-Security-Token',
      'x-token',
    ],
  },
};

// https://github.com/apollographql/apollo-server/pull/3926#issuecomment-612160071
const APIGatewayProxyHandler = (event, context, callback) => {
  //   if (event.source === 'serverless-plugin-warmup') {
  //     return callback(null, 'Lambda is warm!');
  //   }
  // https://github.com/knex/knex/issues/1875#issuecomment-537130307
  // https://github.com/knex/knex/issues/3464#issue-502481522
  // https://github.com/architect/architect/issues/346
  context.callbackWaitsForEmptyEventLoop = false;
  if (Object.keys(event.headers).includes('Content-Type')) {
    event.headers['content-type'] = event.headers['Content-Type'];
  }

  const callbackFilter = function (error, output) {
    // output.headers['Strict-Transport-Security'] =
    //   'max-age=31536000; includeSubDomains; preload';
    // output.headers['X-Content-Type-Options'] = 'nosniff';
    // output.headers['X-Permitted-Cross-Domain-Policies'] = 'none';
    // output.headers['Referrer-Policy'] = 'no-referrer-when-downgrade';
    // output.headers['X-Frame-Options'] = 'DENY';
    // output.headers['X-XSS-Protection'] = '1; mode=block';
    // output.headers['X-Download-Options'] = 'noopen';
    // output.headers['X-Generator'] = 'deny';
    callback(error, output);
  };

  const handler = server.createHandler(options);
  return handler(event, context, callbackFilter);
};

exports.graphqlHandler = APIGatewayProxyHandler;
