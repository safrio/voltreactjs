import React from 'react';
import { Table } from 'react-bootstrap';
import autoBind from 'react-autobind';

class Posts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        errors: {}
    };

    autoBind(this);
  }

  renderPostsList() {
    return this.props.posts.map(post => this.renderPost(post))
  }

  renderPost(post) {
    return (
      <tr key={post.id}>
        <td>{post.id}</td>
        <td>{post.author}</td>
        <td>{post.title}</td>
        <td>{post.published_at}</td>
      </tr>
    );
  }

  render() {
    return (
      <Table striped>
        <thead>
          <tr>
            <th>ID</th>
            <th>Author</th>
            <th>Title</th>
            <th>Published At</th>
          </tr>
        </thead>
        <tbody>
          {this.renderPostsList()}
        </tbody>
      </Table>
    );
  }
};

Posts.propTypes = {
  posts: React.PropTypes.array,
};

export default Posts;