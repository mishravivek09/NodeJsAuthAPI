const express = require('express');
const { createPost, getPost, getAllPost, postUpdate, deletePost, postLike, postComment } = require('../controllers/PostController');
const router = express.Router();


router.post("/create", createPost);
router.get("/all", getAllPost);
router.get("/get/:id", getPost);
router.patch("/update/:id", postUpdate);
router.delete("/delete/:id", deletePost);
router.post("/like/:id", postLike);
router.post("/comment/:id", postComment);

module.exports = router;