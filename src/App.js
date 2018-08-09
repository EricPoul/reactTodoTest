import React, { Component } from 'react';
import './App.scss';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Login from './components/login';
import ToDo from './components/todo';
import CreateEdit from './components/create-edit';
import { Route, Redirect, Switch } from 'react-router-dom';
import Header from './components/header';
import API from './api';
import Roles from './model/roles'

const SwitchRoutes = (props, rest) => <Switch>
  <Route path={`${props.match.url}/list`} render={(props) => (
    <ToDo {...props} list={rest.list} user={rest.user}/>
  )} />
  <Route path={`${props.match.url}/create`} render={(props) => (
    <CreateEdit {...props} list={rest.list} users={rest.users} />
  )} />
  <Route path={`${props.match.url}/edit/:id`} render={(props) => (
    <CreateEdit {...props} list={rest.list} users={rest.users} />
  )} />
  <Redirect to={`${props.match.url}/list`} />
</Switch>;

const RedirectRoute = (props) => <Redirect to={{
  pathname: '/login',
  state: { from: props.location }
}} />

const MainRoute = ({ component: Component, ...rest }) => {
  return <Route path={`${this.props}/`} {...rest} render={(props) => (
    rest.user ? SwitchRoutes(props, rest) : RedirectRoute(props)
  )} />
}

class App extends Component {
  state = {}

  componentDidMount() {
    API.get(`todo`).then(res => {
      let list = res.data
      if (this.props.user && !Roles.includes(this.props.user.role)) {
        list = list.filter(el => el.userDo === this.props.user.email)
      }
      this.props.setTodos(list)
    })
    API.get(`users`).then(res => {
      this.props.setUsers(res.data)
    })
  }

  render() {
    return (
      <div>
        <Header user={this.props.user} />
        <Switch>
          <MainRoute path='/dashboard' list={this.props.todos} users={this.props.users} user={this.props.user} />
          <Route path='/login' component={Login} />
          <Route path='/singup' component={Login} />
          <Redirect to='/dashboard/' />
        </Switch>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    todos: state.todos,
    users: state.users
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch({ type: 'LOGOUT' }),
    setTodos: (todos) => dispatch({ type: 'SET_TODOS', todos }),
    setUsers: (users) => dispatch({ type: 'SET_USERS', users }),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
