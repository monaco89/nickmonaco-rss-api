import dbContext from '../../dbConnection';
import { mapKeys, camelCase } from 'lodash';

export const getUser = (id) =>
  dbContext('users')
    .select()
    .where('id', id)
    .then((res) => res.map((data) => mapKeys(data, (v, k) => camelCase(k))));

export const getUserByEmail = (email) =>
  dbContext('users')
    .select()
    .where('email', email)
    .then((res) => res.map((data) => mapKeys(data, (v, k) => camelCase(k))));

export const createUser = ({ name, email, password }) =>
  dbContext('users').insert({
    name,
    email,
    password,
  });
