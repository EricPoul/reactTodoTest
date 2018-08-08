
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem, UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { withRouter } from 'react-router'

const roleAdmin = ['Admin', 'Root']

class Header extends PureComponent {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      user: this.props.user,
      login: this.props.user ? true : false,
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  logout() {
    this.props.logout();
    this.props.history.push(`/login`)
  }

  static getDerivedStateFromProps(nextProps) {
    return {
      user: nextProps.user,
      login: nextProps.user ? true : false
    };
  }

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <Link className="navbar-brand" to="/dashboard/list">TASK MANAGER</Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="w-100" navbar>
              {
                this.props.user && roleAdmin.includes(this.props.user.role) ? <NavItem>
                  <Link className="nav-link" to="/dashboard/create">Create Task</Link>
                </NavItem> : null
              }
              {this.state.login ?
                <UncontrolledDropdown nav inNavbar className="ml-auto">
                  <DropdownToggle nav caret>
                    {this.state.user.email}
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      Option 2
                      </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={() => this.logout()}>
                      Logout
                      </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                : <NavItem className="ml-auto"><Link className="nav-link" to="/singup">Sing up</Link></NavItem>
              }
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (share) => {
  return {
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch({ type: 'LOGOUT' }),
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
