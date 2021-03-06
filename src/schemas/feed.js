import { gql } from "apollo-server";

export default gql`
  type Feed {
    id: ID!
    name: String
    rss: String
    icon: String
    enabled: Boolean
    user: User!
  }

  type FeedItem {
    title: String
    link: String
    pubDate: String
    creator: String
    content: String
    contentSnippet: String
    guid: String
    categories: [String]
  }

  type FeedOutput {
    feedUrl: String
    title: String
    description: String
    link: String
    items: [FeedItem]
  }

  input CreateFeedInput {
    name: String!
    rss: String!
    icon: String
  }

  extend type Query {
    feeds: [Feed!]
    feed(id: ID!): Feed!
    fetchFeed(url: String!): FeedOutput
  }

  extend type Mutation {
    createFeed(input: CreateFeedInput!): Feed!
    removeFeed(id: ID!): Boolean
  }
`;
