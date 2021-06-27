import { mapKeys, camelCase } from 'lodash';
import dbContext from '../../dbconnection';

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

export const deleteBookmarkByURL = (url, me) =>
  dbContext('bookmarks').where({ url, user_id: me.id }).del();

export const findBookmark = (itemURL) =>
  dbContext('bookmarks').select().where({ url: itemURL });
