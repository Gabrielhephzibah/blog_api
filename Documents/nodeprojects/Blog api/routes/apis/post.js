const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');


//Get all the posts
router.get('/', (req, res, next) => {
    Post.find()
    .then((posts) => {
        res.json(posts);
    })
    .catch(err => console.log(err))
});


// Create  a post
router.post('/add', (req, res, next) => {
    const title = req.body.title;
    const body = req.body.body;
    newPost = new Post({
        title: title,
        body: body
    });
    newPost.save()
    .then(post => {
        res.json(post);
    })
    .catch(err => console.log(err));
});

// router.post('/login', (req, res, next) => {
//     const title = req.body.title;
//     const body = req.body.body;  
//     const password  = req.body.password;
//     const email = req.body.email
//     newPost = new Post({
//         title: title,
//         body: body,
//         password: password,
//         email:email
//     });
//     newPost.save()
//     .then(post => {
//         res.json(post);
//     })
//     .catch(err => console.log(err));
// });

// to update a Post
router.put('/update/:id', (req, res, next) => {
//Grab the id of the post
let id = req.params.id;
// find the post by id from the databasse
    Post.findById(id)
    .then(post => {
        post.title = req.body.title;
        post.body = req.body.body;
        post.save()
        .then(post =>{
            res.send({message: 'Post updated succesfully',
            status: 'sucess',
            post: post})

        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
    
});
// make delete request
router.delete('/:id', (req, res, next) => {
    let id = req.params.id;
    Post.findById(id)
    .then(post => {
        post.delete()
        .then(post =>{
            res.send({message: 'Post deleted succesfully',
            status: 'sucess',
            post: post})

        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})


module.exports = router;