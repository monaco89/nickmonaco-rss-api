import { gql } from 'apollo-server';

export default gql`
  type Bookmark {
    title: String!
    url: String!
    content: String
    pubDate: String
    user: User!
  }

  input CreateBookmarkInput {
    title: String!
    url: String!
    content: String
    pubDate: String
    feedId: Int
  }

  extend type Query {
    bookmarks: [Bookmark!]
    bookmark(id: ID!): Bookmark!
  }

  extend type Mutation {
    createBookmark(input: CreateBookmarkInput!): Bookmark!
    removeBookmark(id: ID!): Boolean
  }
`;
