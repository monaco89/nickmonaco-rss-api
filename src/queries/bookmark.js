import dbContext from '../../dbConnection';
import { mapKeys, camelCase } from 'lodash';

export const getBookmark = (id) =>
  dbContext('bookmarks')
    .select()
    .where('id', id)
    .then((res) => res.map((data) => mapKeys(data, (v, k) => camelCase(k))));

export const getBookmarksByUserId = (id) =>
  dbContext('bookmarks')
    .select()
    .where('user_id', id)
    .then((res) => res.map((data) => mapKeys(data, (v, k) => camelCase(k))));

export const createBookmark = ({ title, url, content, pubDate }, me) =>
  dbContext('bookmarks').insert({
    title,
    url,
    content,
    pubDate,
    user_id: me.id || me,
  });

export const deleteBookmark = (id) =>
  dbContext('bookmarks').where({ id }).del();
