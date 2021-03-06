import React, { Component } from 'react';

import postService from '../services/PostService';

class PostDetail extends Component {
  state = {
    post: null
  }

  componentDidMount() {
    const id = parseInt(this.props.match.params.id);
    const post = postService.get(id);
    this.setState({ post });
  }

  handleDeleteClick = () => {
    if (window.confirm('Are you sure?')) {
      postService.delete(this.state.post.id);
      this.props.history.push('/posts');
    }
  }

  render() {
    const post = this.state.post;

    if (!post) {
      return <div>Loading post. Please wait...</div>;
    }

    return <div className="card bg-light mb-3">
      <div className="card-header">
        <h5>
          {post.title}
        </h5>
      </div>
      <div className="card-body">
        <p className="card-text">
          {post.body}
        </p>
        <p className="card-text">Author: <em>
          {post.author}
        </em></p>
        <p className="card-text">Category: <em>
          {post.category}
        </em></p>
      </div>
      <div className="card-footer">
        <button
          className="btn btn-sm btn-outline-primary mr-1"
          type="button"
          onClick={() => this.props.history.push(`/posts/${post.id}/edit`)}
        >Edit</button>
        <button
          className="btn btn-sm btn-outline-danger mr-1"
          type="button"
          onClick={this.handleDeleteClick}
        >Delete</button>
        <button
          className="btn btn-sm btn-outline-info"
          type="button"
          onClick={() => this.props.history.goBack()}
        >Back</button>
      </div>
    </div>;
  }
}

export default PostDetail;
