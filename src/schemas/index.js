import userSchema from './user';
import feedSchema from './feed';
import bookmarkSchema from './bookmark';
import { gql } from 'apollo-server-lambda';

const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`;

export default [linkSchema, userSchema, feedSchema, bookmarkSchema];
