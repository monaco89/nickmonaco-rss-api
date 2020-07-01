import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import bcrypt from 'bcrypt';

export const UserSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  feeds: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Feed',
    },
  ],
});

UserSchema.plugin(timestamps);

UserSchema.index({ createdAt: 1, updatedAt: 1 });

UserSchema.pre('save', function () {
  const hashedPassword = bcrypt.hashSync(this.password, 12);
  this.password = hashedPassword;
});

const User = mongoose.model('users', UserSchema);

export default User;
