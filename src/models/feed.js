import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';

export const FeedSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
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
});

FeedSchema.plugin(timestamps);

FeedSchema.index({ createdAt: 1, updatedAt: 1 });

const Feed = mongoose.model('feeds', FeedSchema);

export default Feed;
