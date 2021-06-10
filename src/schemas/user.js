import { gql } from 'apollo-server-lambda';

export default gql`
  type User {
    id: ID!
    name: String!
    email: String!
    feeds: [Feed!]
  }

  type Token {
    token: String!
  }

  extend type Query {
    user(id: ID!): User!
    me: User
  }

  extend type Mutation {
    createUser(name: String!, email: String!, password: String!): Token!
    login(email: String!, password: String!): Token!
  }
`;
