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
            list: [] 
        };
    }

    static getDerivedStateFromProps(nextProps) {
        return {
            list: nextProps.list
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
                                <CardTitle>
                                Task create: <span className="role">{el.create}</span> 
                                    <br/>
                                    {el.title}
                                </CardTitle>
                                <CardText><span className="role">{el.userDo}</span> need to do: {el.description}</CardText>
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

const mapDispatchToProps = (dispatch) => {
    return {
        removeTodo: (id) => dispatch({ type: 'DELETE_TODO', id }),
    }
}


export default connect(mapDispatchToProps)(ToDoCard);