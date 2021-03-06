import { combineResolvers } from "graphql-resolvers";
import { isAuthenticated } from "./authorization";
import mongoose from "mongoose";
import fetch from "node-fetch";
import convert from "xml-js";
import Parser from "rss-parser";

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
    fetchFeed: async (parent, { url }) => {
      // Use rss-parser instead
      const parser = new Parser();
      const feed = await parser.parseURL(url);

      return feed;

      // const res = await fetch(url);
      // const xml = await res.text();
      // const json = JSON.parse(
      //   convert.xml2json(xml, { compact: true, spaces: 4 })
      // );
      // const channel = json.rss.channel;
      // console.log(json.rss.channel.items[0]);

      // return {
      //   feedUrl: channel.link._text,
      //   title: channel.title._text,
      //   description: channel.description._text,
      //   link: channel.link._text,
      //   items: channel.item.map((item) => ({
      //     title: item.title._text,
      //     link: item.link._text,
      //     pubDate: item.pubDate._text,
      //     content: item.description._text,
      //     // contentSnippet: item.encoded,
      //     guid: item.guid._text,
      //     categories: item.category.map((cat) => cat._cdata),
      //   })),
      // };
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
    user: async ({ user }, args, { models: { userModel } }, info) =>
      await userModel.findById({ _id: user }).exec(),
  },
};
