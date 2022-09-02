const User = require("../models/Users");
const Thought = require("../models/Thoughts");

module.exports = {

 getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  getOneThought(req, res) {
    Thought.findOne({_id:req.params.thoughtId})
      .then((user) => !user ? res.status(404).json({message:"No thoughts"})
      :res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },

  updateThought(req, res) {
    Thought.findOneAndUpdate(
      {_id:req.params.thoughtId},{$set:req.body},{runValidators:true, new:true})
      .then((thought) => !thought ? res.status(404).json({message:"Try again"})
      :res.json(thought))
  },

deleteThought(req, res) {
    Thought.findOneAndRemove({_id:req.params.thoughtId})
      .then((user) => !user ? res.status(404).json({message:"No thoughts"})
      :Thought.findOneAndUpdate({users: req.params.thoughtId},{$pull:{users: req.params.thoughtId}},{new: true}))
      .then((thought) => !thought ? res.status(404).json({message:"No user with this ID"})
      :res.json({message:"Your thought was deleted"}))
      .catch((err) => res.status(500).json(err));
    },
};