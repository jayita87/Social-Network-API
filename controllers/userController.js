const { ObjectId } = require('mongoose').Types;
const { User } = require('../models');

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then(async (users) => {
        return res.json(users);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: 'No user matched that Id' })
          : res.json({
              user,
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
// update user
  updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId})
    .then((user) =>
    !user
      ? res.status(404).json({ message: 'No user matches that id'})
      : res.status(200).json({ message: 'user updated successfully'})
    )
  },
  // Delete a user
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user matched that Id' })
          : res.status(200).json({ message: 'User deleted successfully'})
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Add an friend to the user
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.body } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No user found with that ID!' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Delete a friend from a user
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.friendId },
      { $pull: { friends: { friendId: req.params.friendId } } },
      { runValidators: true, new: true }
    )
      .then((friend) =>
        !friend
          ? res
              .status(404)
              .json({ message: 'No friends matching that Id!' })
          : res.json(friend)
      )
      .catch((err) => res.status(500).json(err));
  },
};