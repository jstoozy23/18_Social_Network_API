const User = require("../models/Users");

module.exports = {

  getAllUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
    },

  getOneUser(req, res) {
    User.findOne({_id: req.params.userId})
      .then((user) => !user ? res.status(404).json({message:"No user with that name"})
      :res.json(user))
      .catch((err) => res.status(500).json(err));
    },

  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
    },

  updateUser(req, res) {
    User.findOneAndUpdate(
      {_id:req.params.userId},{$set:req.body},{runValidators:true, new:true})
      .then((user) => !user ? res.status(404).json({message:"Sorry no ID found"})
      :res.json(user))
      .catch((err) => {console.log(err);
      res.status(500).json(err);
      });},

  deleteUser(req, res) {
    User.findOneAndRemove({_id:req.params.userId})
      .then((user) => !user ? res.status(404).json({message:"No user found"})
      :User.findOneAndUpdate({users:req.params.userId},{$pull: {users:req.params.userId}},{new:true}))
      .then((user) => ! user? res.status(404).json({message:"User created"})
      :res.json({message:"User deleted!"})
      )
      .catch((err) => res.status(500).json(err));
    },

  addUserFriend(req, res) {
    User.findOneAndUpdate(
      {_id: req.params.userId},{$addToSet:{friends:req.params.friendId}},{runValidators:true, new:true})
      .then((user) => !user ? res.status(404).json({message: "No user found" })
      :res.json(user))
      .catch((err) => res.status(500).json(err));
    },

  deleteUserFriend(req, res) {
    User.findOneAndUpdate(
      {_id:req.params.userId},{$pull:{friends:req.params.friendId}},{ runValidators:true, new:true})
      .then((user) => !user ? res.status(404).json({message:"No user found"})
      :res.json(user))
      .catch((err) => res.status(500).json(err));
    },
};