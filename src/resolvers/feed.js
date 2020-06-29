import { AuthenticationError } from 'apollo-server';
import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from './authorization';

export default {
  Query: {
    feed: combineResolvers(isAuthenticated, async (parent, { id }, { models: { feedModel }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not logged in.');
      }
      const feed = await feedModel.findById({ _id: id }).exec();
      return feed;
    }),
    feeds: combineResolvers(isAuthenticated, async (parent, args, { models: { feedModel }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not logged in.');
      }
      const feeds = await feedModel.find({ user: me.id }).exec();
      return feeds;
    }),
  },
  Mutation: {
    createFeed: combineResolvers(
      isAuthenticated,
      async (parent, { name, rss, icon }, { models: { feedModel }, me }, info) => {
        const feed = await feedModel.create({ name, rss, icon, enabled: true, user: me.id });
        return feed;
      }
    ),
    removeFeed: combineResolvers(isAuthenticated, async (parent, { id }, { models: { feedModel } }, info) => {
      return await feedModel.findByIdAndRemove(id).exec();
    }),
  },
  Feed: {
    user: async ({ user }, args, { models: { userModel } }, info) => {
      return await userModel.findById({ _id: user }).exec();
    },
  },
};
