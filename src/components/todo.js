import React, { PureComponent } from 'react';
import '../styles/todo.scss';
import ToDoCard from './todocard';

class ToDo extends PureComponent {
    render() {
        return (
            <div>
                <ToDoCard list={this.props.list} user={this.props.user}/>
            </div>
        );
    }
}

export default ToDo;