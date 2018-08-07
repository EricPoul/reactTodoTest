import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import '../styles/todo.scss';
import ToDoCard from './todocard';
import API from '../api';


class ToDo extends PureComponent {
    componentDidMount() {
        if(this.props.todos.length < 1) {
            API.get(`users/${this.props.user.id}/todo`)
            .then(res => {
                const persons = res.data;
                this.props.setTodos(persons)
            })
        }
    }
    render() {
        return (
            <div>
                <ToDoCard data={this.props.todos}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        todos: state.todos,
        user: state.user
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addNewUser: (todo) => dispatch({ type: 'ADD_NEW_TODO', todo }),
        setTodos: (todos) => dispatch({ type: 'SET_TODOS', todos })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDo);