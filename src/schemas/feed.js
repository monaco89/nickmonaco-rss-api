import { gql } from 'apollo-server-express';

export default gql`
  type Feed {
    id: ID!
    name: String
    rss: String
    icon: String
    enabled: Boolean
    user: User!
  }

  extend type Query {
    feeds: [Feed!]
    feed(id: ID!): Feed!
  }

  extend type Mutation {
    createFeed(name: String!, rss: String!, icon: String!): Feed!
  }
`;
