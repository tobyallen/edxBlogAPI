module.exports = {
  getComments(req, res) {
    console.log(`Getting Comments for post: ${req.params.postId}`)
    //Check if postId Exists and then get the comments.
    if (req.store.posts[req.params.postId]) {
      //There could be no comments
      if (!req.store.posts[req.params.postId]) {
        req.store.posts[req.params.postId] = []
      }
      res.status(200).send(req.store.posts[req.params.postId].comments)
    } else {
      console.log(`Could not gets posts for non existent post: ${req.params.postId}`)
      res.status(404).send(`Invalid Post ID: ${req.params.postId}`)
    }
  },
  addComment(req, res) {
    console.log(`Adding Comment to post: ${req.params.postId}`)
    let id = (req.store.posts[req.params.postId]).comments.length

    //Check if postId Exists and then get the comments.
    if (req.store.posts[req.params.postId]) {
      //There could be no comments
      (req.store.posts[req.params.postId]).comments.push(req.body)
      res.status(201).send({commentId: id})
    } else {
      console.log(`Could not add comments for non existent post: ${req.params.postId}`)
      res.status(404).send(`Invalid Post ID: ${req.params.postId}`)
    }
  },
  updateComment(req, res) {
    console.log(`Updating Comment to post: ${req.params.postId}`)
    if (req.store.posts[req.params.postId]) {
      //There could be no comments
      if (req.store.posts[req.params.postId].comments[req.params.commentId]) {
        req.store.posts[req.params.postId].comments[req.params.commentId] = req.body
        res.status(200).send(req.store.posts[req.params.postId].comments[req.params.commentId])
      } else {
        console.log(`Could not update comment: ${req.params.commentId}`)
        res.status(404).send(`Invalid Comment ID: ${req.params.commentId}`)
      }
    } else {
      console.log(`Could not update comment for non existent post: ${req.params.postId}`)
      res.status(404).send(`Invalid Post ID: ${req.params.postId}`)
    }
  },
  removeComment(req, res) {
    console.log(`Deleting Comment to post: ${req.params.postId}`)
    if (req.store.posts[req.params.postId]) {
      //There could be no comments
      if (req.store.posts[req.params.postId].comments[req.params.commentId]) {
        req.store.posts[req.params.postId].comments.splice(req.params.commentId, 1);
        console.log(`Deleted Comment: ${req.params.postId}`)
        res.status(204).send()
      } else {
        console.log(`Could not delete comment: ${req.params.commentId}`)
        res.status(404).send(`Invalid Comment ID: ${req.params.commentId}`)
      }
    } else {
      console.log(`Could not delete comment for non existent post: ${req.params.postId}`)
      res.status(404).send(`Invalid Post ID: ${req.params.postId}`)
    }
  }
}
