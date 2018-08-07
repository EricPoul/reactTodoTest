import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
    Card, CardText, CardBody, CardHeader, CardFooter,
    CardTitle
} from 'reactstrap';
import { Link } from 'react-router-dom';
import API from '../api';


class ToDoCard extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            list: props.data
        };
    }

    static getDerivedStateFromProps(nextProps) {
        return {
            list: nextProps.data
        };
      }
    
    setClass(progress) {
        switch(progress) {
            case 'Not start': {
                return 'warning';
            } case 'In progress': {
                return 'primary';
            } case 'Completed': {
                return 'success';
            } default: {
                return '';
            }
        }
    }

    deleteTask(id) {
        API.delete(`todo/${id}`).then(res => {
            this.props.removeTodo(id)
        })
    }

    render() {
        console.log(this.state.list)
        return (
            <div className="container p-4">
                {
                    this.state.list.map(el => (
                        <Card key={el.id}>
                            <CardHeader tag="h3">
                                {el.name}
                                <button className={`btn btn-` + this.setClass(el.progress)} disabled>{el.progress}</button>  
                            </CardHeader>
                            <CardBody>
                                <CardTitle>{el.title}</CardTitle>
                                <CardText><span className="role">{el.role}</span> need to do: {el.description}</CardText>
                            </CardBody>
                            <CardFooter className="text-muted">
                                <Link className="card-link" to={`/dashboard/edit/${el.id}`}>Edit</Link>
                                <button className="btn btn-danger"
                                    onClick={() => this.deleteTask(el.id) }>Delete</button> 
                            </CardFooter>
                        </Card>
                    ))
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        todos: state.todos
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        removeTodo: (id) => dispatch({ type: 'DELETE_TODO', id }),
       // editTodo: (todo) => dispatch({ type: 'EDIT_TODO', todo })
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ToDoCard);