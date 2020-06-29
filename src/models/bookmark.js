import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';

export const BookmarkSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    content: String,
    pubDate: String,
  },
  {
    collection: 'Bookmarks',
  }
);

BookmarkSchema.plugin(timestamps);

BookmarkSchema.index({ createdAt: 1, updatedAt: 1 });

const Bookmark = mongoose.model('Bookmark', BookmarkSchema);

export default Bookmark;
