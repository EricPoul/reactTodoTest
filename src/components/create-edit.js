import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import '../styles/todo.scss';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import {
    Card, CardBody,
    CardTitle
} from 'reactstrap';
import CreateEditForm from './ce-form';
import API from '../api';


class CreateEdit extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Create new task'
        }
    }
    componentDidMount() {
        console.log(this.props)
        if (this.props.match.params.id) {
            this.setState({
                title: 'Edit task'
            })
        }
        
    }

    render() {
        return (
            <div className="container form-container p-4">
                <Card>
                    <CardBody>
                        <CardTitle>{this.state.title}</CardTitle>
                        <CreateEditForm users={this.props.users} list={this.props.list} /> 
                    </CardBody>
                </Card>


            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addTodo: (todo) => dispatch({ type: 'ADD_TODO', todo }),
        editTodo: (todo) => dispatch({ type: 'EDIT_TODO', todo })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEdit);