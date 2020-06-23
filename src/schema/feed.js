import { Feed, FeedTC } from '../models/feed';

const FeedQuery = {
  feedById: FeedTC.getResolver('findById'),
  feedByIds: FeedTC.getResolver('findByIds'),
  feedOne: FeedTC.getResolver('findOne'),
  feedMany: FeedTC.getResolver('findMany'),
  feedCount: FeedTC.getResolver('count'),
  feedConnection: FeedTC.getResolver('connection'),
  feedPagination: FeedTC.getResolver('pagination'),
};

const FeedMutation = {
  feedCreateOne: FeedTC.getResolver('createOne'),
  feedCreateMany: FeedTC.getResolver('createMany'),
  feedUpdateById: FeedTC.getResolver('updateById'),
  feedUpdateOne: FeedTC.getResolver('updateOne'),
  feedUpdateMany: FeedTC.getResolver('updateMany'),
  feedRemoveById: FeedTC.getResolver('removeById'),
  feedRemoveOne: FeedTC.getResolver('removeOne'),
  feedRemoveMany: FeedTC.getResolver('removeMany'),
};

export { FeedQuery, FeedMutation };
