import { combineResolvers } from 'graphql-resolvers';
import Parser from 'rss-parser';
import { isAuthenticated } from './authorization';
import {
  getFeed,
  getFeedByUserId,
  createFeed,
  deleteFeed,
} from '../queries/feed';
import { getUser } from '../queries/user';
import { handleError } from '../utils';

export default {
  Query: {
    feed: combineResolvers(isAuthenticated, async (parent, { id }) => {
      try {
        const feed = await getFeed(id);
        return feed;
      } catch (err) {
        handleError(err);
      }
    }),
    feeds: async (parent, args, { me }) => {
      if (!me) {
        return null;
      }

      try {
        const feeds = await getFeedByUserId(me.id);
        return feeds;
      } catch (err) {
        handleError(err);
      }
    },
    fetchFeed: async (parent, { url }) => {
      try {
        const parser = new Parser();
        const feed = await parser.parseURL(url);

        return feed;
      } catch (err) {
        handleError(err);
      }
    },
  },
  Mutation: {
    createFeed: combineResolvers(
      isAuthenticated,
      async (parent, { input: { name, rss, icon } }, { me }) => {
        try {
          const feed = await createFeed({ name, rss, icon }, me);
          return feed;
        } catch (err) {
          handleError(err);
        }
      }
    ),
    removeFeed: combineResolvers(isAuthenticated, async (parent, { id }) => {
      try {
        await deleteFeed(id);
        return true;
      } catch (err) {
        handleError(err);
      }
    }),
  },
  Feed: {
    user: async ({ user }) => await getUser(user.id),
  },
};
