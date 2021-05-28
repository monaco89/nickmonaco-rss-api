import 'source-map-support/register';
import server from './server';
import { config } from './src/store/config';

exports.graphqlHandler = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const callbackFilter = function (error, output) {
        output.headers['Strict-Transport-Security'] =
            'max-age=31536000; includeSubDomains; preload';
        output.headers['X-Content-Type-Options'] = 'nosniff';
        output.headers['X-Permitted-Cross-Domain-Policies'] = 'none';
        output.headers['Referrer-Policy'] = 'no-referrer-when-downgrade';
        output.headers['X-Frame-Options'] = 'DENY';
        output.headers['X-XSS-Protection'] = '1; mode=block';
        output.headers['X-Download-Options'] = 'noopen';
        output.headers['X-Generator'] = 'deny';
        callback(error, output);
    };

    server.createHandler({
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
    })(event, context, callbackFilter);
};
