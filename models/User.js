const { Schema, model } = require('mongoose');
const { thoughtSchema } = require('./Thought');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
       // Uses Regex to validate email input
      match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
    },
    thoughts: [thoughtSchema],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user'
      },
    ],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true
    },
  }
);

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User= model('user', userSchema);

module.exports = User;