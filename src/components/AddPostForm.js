import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import TextInput from './TextInput';
import TextAreaInput from './TextAreaInput';
import autoBind from 'react-autobind';

class AddPostForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {}
    };

    autoBind(this);
  }

  formIsValid() {
    let errors = {};
    let fieldIsRequired = 'Field is required.';
    let movie = this.props.data;

    if (!movie.title) errors.title = fieldIsRequired;
    if (!movie.body) errors.body = fieldIsRequired;

    this.setState({errors: errors});

    return Object.keys(errors).length === 0;
  }

  save() {
    if (!this.formIsValid()) return;

    this.props.save();
  }

  render() {
    return (
      <Modal show={this.props.visible}>
        <Modal.Header closeButton onClick={this.props.close}>
          <Modal.Title>Add post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TextInput
            name="title"
            type="text"
            label="Title"
            value={this.props.data.title}
            onChange={this.props.onChange}
            placeholder="Title"
            error={this.state.errors.title}
          />
          <TextAreaInput
            name="body"
            type="text"
            label="body"
            value={this.props.data.body}
            onChange={this.props.onChange}
            placeholder="Body"
            error={this.state.errors.body}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="primary" onClick={this.save}>Add</Button>
        </Modal.Footer>
      </Modal>
    );
  }
};

AddPostForm.propTypes = {
  save: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  close: React.PropTypes.func.isRequired,
  data: React.PropTypes.object,
  visible: React.PropTypes.bool
};

export default AddPostForm;