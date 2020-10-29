import { combineResolvers } from "graphql-resolvers";
import { isAuthenticated } from "./authorization";
import mongoose from "mongoose";

export default {
  Query: {
    feed: combineResolvers(
      isAuthenticated,
      async (parent, { id }, { models: { feedModel } }) => {
        const feed = await feedModel.findById({ _id: id }).exec();
        return feed;
      }
    ),
    feeds: async (parent, args, { models: { feedModel }, me }) => {
      try {
        const feeds = (await me)
          ? feedModel.find({ user: me.id || me }).exec()
          : feedModel.find({}).exec();
        return feeds;
      } catch (e) {
        return null;
      }
    },
  },
  Mutation: {
    createFeed: combineResolvers(
      isAuthenticated,
      async (
        parent,
        { input: { name, rss, icon } },
        { models: { feedModel }, me },
        info
      ) => {
        const feed = await feedModel.create({
          name,
          rss,
          icon,
          enabled: true,
          user: me.id || mongoose.Types.ObjectId(me),
        });
        return feed;
      }
    ),
    removeFeed: combineResolvers(
      isAuthenticated,
      async (parent, { id }, { models: { feedModel } }, info) => {
        try {
          await feedModel.findByIdAndRemove(id).exec();
          return true;
        } catch (e) {
          return false;
        }
      }
    ),
  },
  Feed: {
    user: async ({ user }, args, { models: { userModel } }, info) => {
      return await userModel.findById({ _id: user }).exec();
    },
  },
};
