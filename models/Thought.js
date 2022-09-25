const { Schema, model } = require('mongoose');
const moment = require('moment');

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: 'Reaction cannot be empty.',
            maxLength: 280
        },
        username: {
            type: String,
            required: 'Username is required.'
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdDate => moment(createdDate).format('MMM D, YYYY | h:mm a')
        }
    }
);

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: 'Thought cannot be empty.',
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdDate => moment(createdDate).format('MMM D, YYYY | h:mm a')
        },
        username: {
            type: String,
            required: 'Username is required.'
        },
        reactions: [ ReachtionSchema ]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false
    }
);

// get number of reactions
ThoughtSchema.virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;