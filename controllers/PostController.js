const BanaoPost = require("../models/BanaoPost");

exports.createPost = async (req, res) => {
    try {
        const post = new BanaoPost(req.body);
        await post.save();
        res.status(201).send(post);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getAllPost = async (req, res) => {
    try {
        const posts = await BanaoPost.find();
        res.send(posts);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getPost = async (req, res) => {
    try {
        const post = await BanaoPost.findById(req.params.id);
        if (!post) {
            return res.status(404).send();
        }
        res.send(post);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.postUpdate = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'content'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const post = await BanaoPost.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!post) {
            return res.status(404).send();
        }
        res.send(post);
    } catch (error) {
        res.status(400).send(error);
    }
};


exports.deletePost = async (req, res) => {
    try {
        const post = await BanaoPost.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).send();
        }
        res.send(post);
    } catch (error) {
        res.status(500).send(error);
    }
};


exports.postLike = async (req, res) => {
    try {
        const post = await BanaoPost.findById(req.params.id);
        if (!post) {
            return res.status(404).send();
        }
        post.likes++;
        await post.save();
        res.send(post);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.postComment = async (req, res) => {
    try {
        const post = await BanaoPost.findById(req.params.id);
        if (!post) {
            return res.status(404).send();
        }
        post.comments.push(req.body);
        await post.save();
        res.send(post);
    } catch (error) {
        res.status(500).send(error);
    }
};
