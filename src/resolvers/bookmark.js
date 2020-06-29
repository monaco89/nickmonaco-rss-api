import { AuthenticationError } from 'apollo-server';
import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from './authorization';

export default {
  Query: {
    bookmark: combineResolvers(isAuthenticated, async (parent, { id }, { models: { bookmarkModel }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not logged in.');
      }
      const bookmark = await bookmarkModel.findById({ _id: id }).exec();
      return bookmark;
    }),
    bookmarks: combineResolvers(isAuthenticated, async (parent, args, { models: { bookmarkModel }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not logged in.');
      }
      const bookmarks = await bookmarkModel.find({ user: me.id }).exec();
      return bookmarks;
    }),
  },
  Mutation: {
    createBookmark: combineResolvers(
      isAuthenticated,
      async (parent, { title, url, content, pubDate }, { models: { bookmarkModel }, me }, info) => {
        const bookmark = await bookmarkModel.create({ title, url, content, pubDate, user: me.id });
        return bookmark;
      }
    ),
    removeBookmark: combineResolvers(isAuthenticated, async (parent, { id }, { models: { bookmarkModel } }, info) => {
      return await bookmarkModel.findByIdAndRemove(id).exec();
    }),
  },
  Bookmark: {
    user: async ({ user }, args, { models: { userModel } }, info) => {
      return await userModel.findById({ _id: user }).exec();
    },
  },
};
