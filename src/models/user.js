import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import bcrypt from 'mongoose-bcrypt';

export const UserSchema = new Schema(
  {
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
      bcrypt: true,
    },
  },
  {
    collection: 'users',
  }
);

// Custom Resolvers
//github.com/graphql-compose/graphql-compose-mongoose#how-can-i-pushpop-or-addremove-values-to-arrays
// UserTC.addResolver({
//   name: 'findOrCreate',
//   kind: 'mutation',
//   type: UserTC.getResolver('createOne').getType(),
//   args: UserTC.getResolver('createOne').getArgs(),
//   resolve: async ({ source, args, context, info }) => {
//     const user = await User.findOne(args.record).exec();
//     if (!user) user = await User.create(args.record);

//     return {
//       record: user,
//       recordId: UserTC.getRecordIdFn()(user),
//     };
//   },
// });

UserSchema.plugin(timestamps);
UserSchema.plugin(bcrypt);

UserSchema.index({ createdAt: 1, updatedAt: 1 });

export const User = mongoose.model('User', UserSchema);
export const UserTC = composeWithMongoose(User);
