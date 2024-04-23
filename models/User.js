const { Schema, model } = require('mongoose');

const friendSchema = new Schema (
  {
    friendId: {
      type: Schema.Types.ObjectId,
      ref: 'Users'
    },
    username: {
      type: String,
      required: true
    }
  },
  {
    toJSON: {
      getters: true,
    },
  }
)

const userSchema = new Schema (
  {
    username:
    {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email:
    {
      type: String,
      unique: true,
      required: true,
      match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
    },
    thoughts:
    [{
      type:Schema.Types.ObjectId,
      ref: 'Thoguhts'
    }],
    friends: [friendSchema]
  },
  {
    toJSON:
    {
      virtuals: true,
      getter: true
    },
    id: false
  }
)

userSchema.virtual('friendsCount').get(function() {
  return this.friends.length;
})

const user = model('User', userSchema);

module.exports = user;
