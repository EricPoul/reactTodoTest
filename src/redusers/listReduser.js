const listDefault = []

export default (state = listDefault, action) => {
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