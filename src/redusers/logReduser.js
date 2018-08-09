const userDefault = JSON.parse(localStorage.getItem('user')) || null;

export default (state = userDefault, action) => {
  if (action.type === 'LOGIN') {
    localStorage.setItem('user', JSON.stringify(action.login))
    return action.login
  } else if (action.type === 'LOGOUT') {
    localStorage.removeItem('user')
    return null
  }
  return state
}
