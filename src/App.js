import React, { Component } from 'react';
import './App.scss';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Redusers from './reduser';
import Main from './components/main';
import Login from './components/login';
import ToDo from './components/todo';
import CreateEdit from './components/create-edit';
import { Route, Redirect, Switch } from 'react-router-dom';
import Header from './components/header';


const store = createStore(Redusers);
window.store = store;

const MainRoute = ({ component: Component, ...rest }) => (
  <Route path={`${this.props}/`} {...rest} render={(props) => (
    store.getState().user
      ? <div>
        <Switch>
          <Route path={`${props.match.url}/list`} component={ToDo} />
          <Route path={`${props.match.url}/create`} component={CreateEdit} />
          <Route path={`${props.match.url}/edit/:id`} component={CreateEdit} />
          <Redirect to={`${props.match.url}/list`} />
        </Switch>
      </div>
      : <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }} />
  )} />
)

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <div>
          <Header />
          <Switch>
            <MainRoute path='/dashboard' component={Main} />
            <Route path='/login' push component={Login} />
            <Route path='/singup' push component={Login} />
            <Redirect to='/dashboard/' />
          </Switch>
        </div>
      </Provider>
    )
  }
}

export default App;
