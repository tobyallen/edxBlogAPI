const express = require('express')
const logger = require('morgan')
const errorhandler = require('errorhandler')
const bodyParser = require('body-parser')
const path = require('path')
const routes =  require(path.join(__dirname, 'routes'))

let store = {
  posts: [
    {name: 'Top 10 ES6 Features every Web Developer must know',
    url: 'https://webapplog.com/es6',
    text: 'This essay will give you a quick introduction to ES6. If you don’t know what is ES6, it’s a new JavaScript implementation.',
    comments: [
      {text: 'Cruel…..var { house, mouse} = No type optimization at all'},
      {text: 'I think you’re undervaluing the benefit of ‘let’ and ‘const’.'},
      {text: '(p1,p2)=>{ … } ,i understand this ,thank you !'}
    ]
    }
  ]
}


let app = express();
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(errorhandler());

// Add store to requests
app.use(function (req,res,next) {
  req.store = store
  next()
})

// GET and POST /posts
app.get('/posts', routes.posts.getPosts)
app.post('/posts', routes.posts.addPost)

// PUT and DELETE /posts/:postId/
app.put('/posts/:postId', routes.posts.updatePost)
app.delete('/posts/:postId', routes.posts.removePost)

// GET and POST /posts/:postId/comments
app.get('/posts/:postId/comments', routes.commentsHandler.getComments)
app.post('/posts/:postId/comments', routes.commentsHandler.addComment)

// PUT and DELETE /posts/:postId/comments/commentId
app.put('/posts/:postId/comments/:commentId', routes.commentsHandler.updateComment)
app.delete('/posts/:postId/comments/:commentId', routes.commentsHandler.removeComment)


app.listen(3000)
