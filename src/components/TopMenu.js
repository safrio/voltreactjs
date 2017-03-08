import React from 'react';
import { Navbar, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import autoBind from 'react-autobind';

class TopMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        errors: {}
    };

    autoBind(this);
  }

  render() {
    return (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            JsonApiApp
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavDropdown eventKey={1} title="Posts" id="nav-dropdown-posts">
              <MenuItem eventKey={1.1} onClick={this.props.addPostClick}>Add</MenuItem>
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            <NavDropdown eventKey={2} title="User" id="nav-dropdown-users">
              <MenuItem eventKey={2.1} onClick={this.props.showAvatarClick}>Avatar</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
};

TopMenu.propTypes = {
  addPostClick: React.PropTypes.func.isRequired,
  showAvatarClick: React.PropTypes.func.isRequired,
};

export default TopMenu;