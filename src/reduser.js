import { combineReducers } from 'redux';

const todoReduser = (state = [], action) => {
    switch (action.type) {
      case 'EDIT_TODO': {
        return state.map(el => {
          if (el.id === action.todo.id) {
            return action.todo
          }
          return el;
        });
      } case 'ADD_TODO': {
        return state.concat(action.todo)
      } case 'DELETE_TODO': {
        return state.filter(el => el.id !== action.id)
      } case 'SET_TODOS': {
        return action.todos;
      } default: {
        return state;
      }
    }
  }
  const user = JSON.parse(localStorage.getItem('user')) || null;
  const logReduser = (state = user, action) => {
    if (action.type === 'LOGIN') {
      localStorage.setItem('user', action.login)
      return JSON.parse(localStorage.getItem('user'))
    } else if (action.type === 'LOGOUT') {
      localStorage.removeItem('user')
      return JSON.parse(localStorage.getItem('user'))
    }
    return state
  }

  const usersReduser = (state = [], action) => {
    if (action.type === 'SET_USERS') {
      return action.users
    }
    return state
  }

  const redusers = combineReducers({ todos: todoReduser, user: logReduser, users: usersReduser });
  export default redusers 