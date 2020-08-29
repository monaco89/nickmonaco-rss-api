import server from "./server";
import initConnection from "./dbconnection";
import { config } from "./src/store/config";

exports.graphqlHandler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  // warmup plugin early return
  if (
    event.source === "serverless-plugin-warmup" ||
    (context.custom && context.custom.source === "serverless-plugin-warmup")
  ) {
    // console.log('WarmUp - Lambda is warm!');
    callback(null, {
      statusCode: 200,
      body: "warmed",
    });
  } else {
    initConnection().then((connection) => {
      // console.log('creating handler');
      server.createHandler({
        cors: {
          origin: config.env.originDomain,
          credentials: true,
          methods: "POST, GET, OPTIONS",
          allowedHeaders: [
            "Content-Type",
            "X-Amz-Date",
            "Authorization",
            "X-Api-Key",
            "X-Amz-Security-Token",
            "x-token",
          ],
        },
      })(event, context, callback);
    });
  }
};
