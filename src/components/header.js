
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { withRouter } from 'react-router'



class Header extends PureComponent {
  constructor(props) {
    super(props);
    console.log(props)

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
    console.log(this.props)
    this.props.logout();
    this.props.history.push(`/login`)
  }

  static getDerivedStateFromProps(nextProps) {
    console.log(nextProps)
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
              <NavItem>
                <Link className="nav-link" to="/dashboard/create">Create Task</Link>
              </NavItem>
                { this.state.login ?
                    <UncontrolledDropdown nav inNavbar className="ml-auto">
                    <DropdownToggle nav caret>
                      { this.state.user.email }
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>
                        Option 2
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem  onClick={() => this.logout()}>
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
    user: share.user
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
      logout: () => dispatch({ type: 'LOGOUT' }),
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));