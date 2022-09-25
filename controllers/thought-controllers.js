const { Thought } = require('../models');

const thoughtController = {
    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .select('-__v')
            .sort({ createdAt: -1 })
            .then(thoughtsData => res.json(thoughtsData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // get one thought by id
    getOneThought({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(thoughtData => {
                // if no thought is found, send 404 error
                if (!thoughtData) {
                    res.status(404).json({ message: 'No thought found with this ID.' });
                    return;
                };
                res.json(thoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // create a new thought
    // expects { "thoughtText": "THOUGHT", "username": "USERNAME", "userId": "USERID" }
    createThought({ body }, res) {
        Thought.create(body)
            .then(({ _id, userId }) => {
                // push created thought's id to associated user's thoughts array
                return User.findOneAndUpdate(
                    { _id: userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(userData => {
                // if no user is found, send a 404 error
                if (!userData) {
                    res.status(404).json({ message: 'No user found with this ID.' });
                    return;
                };
                res.json(userData);
            })
            .catch(err => res.json(err));
    },

    // create a new reaction
    createReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            // push reaction body to associated thought's reactions array
            { _id: params.id },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then(thoughtData => {
                // if no thought found, send 404 error
                if (!thoughtData) {
                    res.status(404).json({ message: 'No thought found with that ID.' });
                    return;
                };
                res.json(thoughtData);
            })
            .catch(err => res.json(err));
    },

    // update a thought by id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true, runValidators: true }
        )
            .then(thoughtData => {
                // if no thought found, send 404 error
                if (!thoughtData) {
                    res.status(404).json({ message: 'No thought found with this ID.' });
                    return;
                };
                res.json(thoughtData);
            })
            .catch(err => res.status(400).json(err));
    },

    // remove a thought by id
    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then((deletedThought) => {
                // if no thought found, send 404 error
                if (!deletedThought._id) {
                    res.status(404).json({ message: 'No thought found with this ID.' });
                    return;
                } else if (deletedThought._id && !deletedThought.userId) {
                    // if thought found with no associated user id, simply delete thought
                    res.json(deletedThought)
                };
                // remove deleted thought's id from associated user's thoughts array
                return User.findOneAndUpdate(
                    { _id: deletedThought.userId },
                    { $pull: { thoughts: deletedThought._id } },
                    { new: true }
                );
            })
            .then(updatedUserData => {
                // if no user found, send message
                if (!updatedUserData) {
                    res.json({ message: 'Thought deleted. No associated user found.' });
                    return;
                };
                // respond with updated user and message indicating thought has been deleted
                res.json({ body: updatedUserData, message: 'Thought deleted. Associated user updated.' });
            })
            .catch(err => res.status(400).json(err));
    },

    // remove a reaction by thought and reaction id
    // expects params thoughtId and reactionId
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then(thoughtData => res.json(thoughtData))
            .catch(err => res.json(err));
    }
};