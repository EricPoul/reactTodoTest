import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import '../styles/todo.scss';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import {
    Card, CardBody,
    CardTitle
} from 'reactstrap';
import API from '../api';


class CreateEdit extends PureComponent {
    constructor(props) {
        super(props);
        if (props.match.path === '/dashboard/create') {
            this.state = {
                form: {
                    id: '',
                    name: '',
                    title: '',
                    description: '',
                    progress: '',
                    userId: this.props.user.id
                },
                title: 'Create new task' 
            }
        } else {
            this.state = {
                form: this.props.todos.find((el) => el.id === +props.match.params.id),
                title: 'Edit task' 
            }
        }
    }

    handleChange(event, type) {
        const state = this.state;
        state.form[type] = event.target.value;
        this.setState({ state });
    }

    updateTodo(e) {
        e.preventDefault();
        if (this.props.match.path === '/dashboard/create') {
            API.post('/todo', this.createBody(this.state.form)).then(res => {
                this.props.addTodo(res.data)
            })
        } else {
            API.put(`/todo/${this.state.form.id}`, this.createBody(this.state.form)).then(res => {
                this.props.editTodo(res.data)
            })
        }
        this.props.history.goBack();
    }
    
    createBody(form) {
        return {
            id: form.id,
            name: form.name,
            title: form.title,
            description: form.description,
            progress: form.progress,
            userId: form.userId
        }
    }

    render() {
        return (
            <div className="container form-container p-4">
                <Card>
                    <CardBody>
                        <CardTitle>{this.state.title}</CardTitle>
                        <Form onSubmit={(e) => this.updateTodo(e)}>
                            <FormGroup>
                                <Label for="nameTask">Task name</Label>
                                <Input type="text" name="name" require="true" id="nameTask" placeholder="Some task name" value={this.state.form.name}
                                    onChange={(e) => this.handleChange(e, 'name')} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="titleTask">Title</Label>
                                <Input type="text" name="password" id="titleTask" placeholder="Tilte" value={this.state.form.title}
                                    onChange={(e) => this.handleChange(e, 'title')} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="progressTask">Progress</Label>
                                <Input type="select" name="select" id="progressTask" value={this.state.form.progress}
                                    onChange={(e) => this.handleChange(e, 'progress')}>
                                    <option className="def-opt" disabled value="">Select value</option>
                                    <option value="Not start">Not start</option>
                                    <option value="In progress">In progress</option>
                                    <option value="Completed">Completed</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="descrTask">Description</Label>
                                <Input type="textarea" name="text" id="descrTask" value={this.state.form.description}
                                    onChange={(e) => this.handleChange(e, 'description')} />
                            </FormGroup>
                            <Button className="btn-success">Submit</Button>
                        </Form>
                    </CardBody>
                </Card>


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
        addTodo: (todo) => dispatch({ type: 'ADD_TODO', todo }),
        editTodo: (todo) => dispatch({ type: 'EDIT_TODO', todo })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEdit);