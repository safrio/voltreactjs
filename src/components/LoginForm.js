import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import TextInput from './TextInput';
import autoBind from 'react-autobind';

class LoginForm extends React.Component {
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

    if (!movie.email) errors.email = fieldIsRequired;
    if (!movie.password) errors.password = fieldIsRequired;

    this.setState({errors: errors});

    return Object.keys(errors).length === 0;
  }

  login() {
    if (!this.formIsValid()) return;

    this.props.login();
  }

  render() {
    return (
      <Modal show={this.props.visible}>
        <Modal.Header>
          <Modal.Title>Login please</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TextInput
            name="email"
            type="text"
            label="E-mail"
            value={this.props.data.email}
            onChange={this.props.onChange}
            placeholder="E-mail"
            error={this.state.errors.email}
          />
          <TextInput
            name="password"
            type="password"
            label="Password"
            value={this.props.data.password}
            onChange={this.props.onChange}
            placeholder="Password"
            error={this.state.errors.password}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="primary" onClick={this.login}>Login</Button>
        </Modal.Footer>
      </Modal>
    );
  }
};

LoginForm.propTypes = {
  login: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  data: React.PropTypes.object,
  visible: React.PropTypes.bool
};

export default LoginForm;