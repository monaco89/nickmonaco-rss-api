import { AuthenticationError } from 'apollo-server-express';
import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from './authorization';

export default {
  Query: {
    feed: async (parent, { id }, { models: { feedModel }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const feed = await feedModel.findById({ _id: id }).exec();
      return feed;
    },
    feeds: async (parent, args, { models: { feedModel }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const feeds = await feedModel.find({ author: me.id }).exec();
      return feeds;
    },
  },
  Mutation: {
    createFeed: combineResolvers(
      isAuthenticated,
      async (parent, { name, rss, icon }, { models: { feedModel }, me }, info) => {
        if (!me) {
          throw new AuthenticationError('You are not authenticated');
        }
        const feed = await feedModel.create({ name, rss, icon, enabled: true, user: me.id });
        return feed;
      }
    ),
  },
  Feed: {
    user: async ({ author }, args, { models: { userModel } }, info) => {
      const user = await userModel.findById({ _id: author }).exec();
      return user;
    },
  },
};
