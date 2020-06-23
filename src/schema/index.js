import { SchemaComposer } from 'graphql-compose';

import db from '../utils/db'; // eslint-disable-line no-unused-vars

const schemaComposer = new SchemaComposer();

import { UserQuery, UserMutation } from './user';
import { FeedQuery, FeedMutation } from './feed';

schemaComposer.Query.addFields({
  ...UserQuery,
  ...FeedQuery,
});

schemaComposer.Mutation.addFields({
  ...UserMutation,
  ...FeedMutation,
});

export default schemaComposer.buildSchema();
