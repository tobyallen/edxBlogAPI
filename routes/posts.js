module.exports = {
  getPosts(req, res) {
      console.log('Got Posts')
      res.status(200).send(req.store.posts);
  },
  addPost(req, res) {
      let post = req.body
      let id = req.store.posts.length
      req.store.posts.push(post)
      console.log(`Added Post ${id}`)
      res.status(201).send({id: id})
  },
  updatePost(req, res) {
      let post = req.body
      let postId = req.params.postId

      if (req.store.posts[postId]) {
        req.store.posts[postId] = post
        console.log(`Updated Post at ${postId}`)
        res.status(200).send(req.store.posts[postId])
      } else {
        console.log(`Failed to update post: ${postId}`)
        res.status(404).send(`Invalid Post ID: ${postId}`)
      }

  },
  removePost(req, res) {
    let postId = req.params.postId

    if (req.store.posts[postId]) {
      req.store.posts.splice(postId, 1)
      console.log(`Deleted Post: ${postId}`)
      res.status(204).send()
    } else {
      console.log(`Failed to delete post: ${postId}`)
      res.status(404).send(`Invalid Post ID: ${postId}`)
    }
  }
}
