const { ObjectId } = require('mongoose').Types;
const { user, thoughts, thought } = require('../models');

module.exports = {
    getThoughts(req, res) {
        thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    
    getOneThought(req, res) {
        thought.findOne({ _id: req.params.thoughtId })
        .select('-_v')
        .then((thought) =>
        !thought
            ? res.status(404).json({ message: 'No Thought'})
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

    createThought(req, res) {
        user.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { thoughts: req.body }},
            { runValidators: true, new: true }
        )
        .then((user) =>
            !user
                ? res.status(404).json({ message: 'No User found' })
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    
    updateThought(req, res) {
        thought.findOneAndUpdate(
            { _id: req.params.thoughtId},
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((thought) =>
            !thought
            ? res.status(404).json({ message: 'No Thought' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

    deletethought(req, res) {
        thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No Thought' })
                : res.json(thought)
        )
        .then(() => res.json({ message: 'Thought deleted'}))
        .catch((err) => res.status(500).json(err));      
    },

    createReaction(req, res) {
        thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body }},
            { runValidators: true, new: true }
        )
        .then((thought) =>
        !thought
            ? res.status(404).json({ message: 'No Thought' })
            : res.json({ message: 'Reaction successfully added' })
        )
        .catch((err) => res.status(500).json(err))
    },

    deleteReaction(req, res) {
        thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reaction}}},
            { runValidators: true, new: true}
        )
        .then((thought) =>
        !thought
            ? res.status(404).json({ message: 'No Thought' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    }
};
