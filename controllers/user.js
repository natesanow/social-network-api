const { ObjectId } = require('mongoose').Types;
const { userInfo } = require('os');
const { user, thoughts, thought } = require('../models');

module.exports = {
    getUsers(req, res) {
        user.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },

    getOneUser(req, res) {
        user.findOne({ _id: req.params.userId})
            .select('-_v')
            .then((user) =>
            !user
                ? res.status(404).json({ message: 'No User Found' })
                : res.json(user)
                )
    },

    createUser(req, res) {
        user.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },
    
    updateUser(req, res) {
        user.findOneandUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((user) =>
        !user
            ? res.status(404).json({ message: 'No User Found' })
            : res.join(user)
            )
        .catch((err) => res.status(500).json(err));      
    },

    deleteUser(req, res) {
        user.findOneAndDelete({ _id: req.params.userId })
        .then((user) =>
        !user
            ? res.status(404).json({ message: 'No User Found' })
            : thought.deleteMany({ _id: { $in: user.thoughts}})
        )
        .then(() => res.json({ message: 'User Deleted'}))
        .catch((err) => res.status(500).json(err));
    },

    addFriend(req, res) {
        console.log('Adding friend to list');
        console.log(req.body);
        user.findOneAndUpdate(
            { _id: req.params,userId },
            { $addToSet : {friends: req.body }},
            { runValidators: true, new: true }
        )
        .then((user) =>
        !user
            ? res.status(404).json({ message: 'No User Found' })
            : res.json(user)    
        )
        .catch((err) => res.status(500).json(err));
    },

    deleteFriend(req, res) {
        user.findOneAndUpdate(
            { _id: req.parmams.userId },
            { $pull: { friends: { friendId: req.params.friend}}},
            { runValidators: true, new: true}   
        )
        .then((user) =>
        !user
        ? res.status(404).json({ message: 'No User Found'})
        : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
};
