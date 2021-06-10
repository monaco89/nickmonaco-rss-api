import { ForbiddenError } from 'apollo-server-lambda';
import { skip } from 'graphql-resolvers';

export const isAuthenticated = (parent, args, { me }) =>
  me ? skip : new ForbiddenError('You are not logged in.');
