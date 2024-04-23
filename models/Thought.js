const { Schema, model, types } = require('mongoose');

const reactionSchema = new Schema (
  {
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false
  }  
)

const thoughtSchema = new Schema (
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'Users'
    },
    reactions: [reactionSchema]
  },  
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const thought = model('Thought', thoughtSchema);

module.exports = thought;