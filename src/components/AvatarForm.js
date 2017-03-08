import React from 'react';
import { Modal, Button, Thumbnail, Collapse, Panel } from 'react-bootstrap';

class AvatarForm extends React.Component {
  render() {
    return (
      <Modal show={this.props.visible}>
        <Modal.Header closeButton onClick={this.props.close}>
          <Modal.Title>Avatar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Thumbnail href="#" alt="171x180" src={this.props.avatarSrc} />

          <Collapse in={this.props.avatarStatus}>
            <Panel header="Loading" bsStyle="success" />
          </Collapse>

          <input type="file" name="avatar" onChange={this.props.fileChange} />
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="danger" onClick={this.props.upload}>Upload</Button>
          <Button bsStyle="primary" onClick={this.props.close}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
};

AvatarForm.propTypes = {
  avatarSrc: React.PropTypes.string,
  fileChange: React.PropTypes.func.isRequired,
  upload: React.PropTypes.func.isRequired,
  close: React.PropTypes.func.isRequired,
  visible: React.PropTypes.bool.isRequired,
  avatarStatus: React.PropTypes.bool.isRequired
};

export default AvatarForm;