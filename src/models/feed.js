import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import { composeWithMongoose } from 'graphql-compose-mongoose';

export const FeedSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      // TODO
      //  required: false,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    rss: {
      type: String,
      trim: true,
      required: true,
    },
    icon: {
      type: String,
      trim: true,
    },
    enabled: {
      type: Boolean,
      default: true,
    },
  },
  {
    collection: 'feeds',
  }
);

FeedSchema.plugin(timestamps);

FeedSchema.index({ createdAt: 1, updatedAt: 1 });

export const Feed = mongoose.model('Feed', FeedSchema);
export const FeedTC = composeWithMongoose(Feed);
