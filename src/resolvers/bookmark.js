// import { AuthenticationError } from 'apollo-server';
import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from './authorization';
import {
  getBookmark,
  getBookmarksByUserId,
  createBookmark,
  deleteBookmark,
} from '../queries/bookmark';
import { getUser } from '../queries/user';
import { handleError } from '../utils';

export default {
  Query: {
    bookmark: combineResolvers(isAuthenticated, async (parent, { id }) => {
      try {
        const bookmark = await getBookmark(id);
        return bookmark;
      } catch (err) {
        handleError(err);
      }
    }),
    bookmarks: combineResolvers(
      isAuthenticated,
      async (parent, args, { me }) => {
        try {
          const bookmarks = await getBookmarksByUserId(me.id);
          return bookmarks;
        } catch (err) {
          handleError(err);
        }
      }
    ),
  },
  Mutation: {
    createBookmark: combineResolvers(
      isAuthenticated,
      async (parent, { title, url, content, pubDate }, { me }) => {
        try {
          const bookmark = await createBookmark(
            {
              title,
              url,
              content,
              pubDate,
            },
            me
          );
          return bookmark;
        } catch (err) {
          handleError(err);
        }
      }
    ),
    removeBookmark: combineResolvers(
      isAuthenticated,
      async (parent, { id }) => {
        try {
          return await deleteBookmark(id);
        } catch (err) {
          handleError(err);
        }
      }
    ),
  },
  Bookmark: {
    user: async ({ user }) => {
      try {
        return await getUser(user.id);
      } catch (err) {
        handleError(err);
      }
    },
  },
};
