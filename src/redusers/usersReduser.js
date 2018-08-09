const usersDefault = [];

export default (state = usersDefault, action) => {
    if (action.type === 'SET_USERS') {
        return action.users
    }
    return state
}