import dbContext from '../../dbConnection';
import { mapKeys, camelCase } from 'lodash';

export const getFeedByUserId = (id) =>
  dbContext('feeds')
    .select()
    .where('user_id', id)
    .then((res) => res.map((data) => mapKeys(data, (v, k) => camelCase(k))));

export const getFeed = (id) =>
  dbContext('feeds')
    .select()
    .where('id', id)
    .then((res) => res.map((data) => mapKeys(data, (v, k) => camelCase(k))));

export const createFeed = ({ name, rss, icon }, me) =>
  dbContext('feeds').insert({
    name,
    rss,
    icon,
    enabled: true,
    user: me.id,
  });

export const deleteFeed = (id) => dbContext('feeds').where({ id }).del();
