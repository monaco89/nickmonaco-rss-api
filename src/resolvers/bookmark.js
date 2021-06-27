import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from './authorization';
import {
  getBookmark,
  getBookmarksByUserId,
  createBookmark,
  deleteBookmarkByURL,
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
      async (parent, { input: { title, url, content, pubDate } }, { me }) => {
        try {
          const bookmark = await createBookmark(
            {
              title: title || '',
              url: url || '',
              content,
              pubDate,
            },
            me
          );
          return bookmark[0];
        } catch (err) {
          handleError(err);
        }
      }
    ),
    removeBookmark: combineResolvers(
      isAuthenticated,
      async (parent, { url }, { me }) => {
        try {
          await deleteBookmarkByURL(url, me);
          return true;
        } catch (err) {
          handleError(err);
        }

        return false;
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
