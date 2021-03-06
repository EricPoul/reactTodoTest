import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
    Card, CardText, CardBody, CardHeader, CardFooter,
    CardTitle
} from 'reactstrap';
import { Link } from 'react-router-dom';
import API from '../api';
import Roles from '../model/roles'


class ToDoCard extends PureComponent {
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
        return (
            <div className="container p-4">
                {
                    this.props.list.map(el => (
                        <Card key={el.id}>
                            <CardHeader tag="h3">
                                {el.name}
                                <button className={`btn btn-` + this.setClass(el.progress)} disabled>{el.progress}</button>  
                            </CardHeader>
                            <CardBody>
                                <CardTitle>
                                Create: <span className="role">{el.create}</span> 
                                    <br/>
                                    {el.title}
                                </CardTitle>
                                <CardText><span className="role">{el.userDo}</span> need to do: <br/> {el.description}</CardText>
                            </CardBody>
                            <CardFooter className="text-muted">
                                <Link className="card-link" to={`/dashboard/edit/${el.id}`}>Edit</Link>
                                {  
                                    Roles.includes(this.props.user.role) ? <button className="btn btn-danger"
                                        onClick={() => this.deleteTask(el.id) }>Delete</button> : null
                                }
                            </CardFooter>
                        </Card>
                    ))
                }
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeTodo: (id) => dispatch({ type: 'DELETE_TODO', id }),
    }
}


export default connect(mapDispatchToProps)(ToDoCard);