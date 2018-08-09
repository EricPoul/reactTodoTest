import { combineReducers } from 'redux';
import listReduser from './listReduser';
import usersReduser from './usersReduser';
import logReduser from './logReduser';

export default combineReducers({ todos: listReduser, user: logReduser, users: usersReduser });