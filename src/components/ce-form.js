import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import '../styles/todo.scss';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import {
    Card, CardBody,
    CardTitle
} from 'reactstrap';
import API from '../api';


class CreateEditForm extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            task: {
                name: '',
                description: '',
                progress: '',
                userDo: '',
                role: ''
            },
            selectUsers: []
        };
    }

    componentDidMount(props) {
        this.setState({
            task: this.props.list.length > 0 && this.props.match.params.id ? this.props.list.find((el) => el.id === +this.props.match.params.id) : {
                name: '',
                description: '',
                progress: '',
                userDo: '',
                role: ''
            },
            selectUsers: this.props.users.filter(el => el.role === this.state.task.role)
        });
    }



    componentWillUpdate(nextProps, state) {
        console.log(nextProps, state)
        const role = nextProps.list.length > 0 && nextProps.match.params.id ? nextProps.list.find((el) => el.id === +nextProps.match.params.id).role : ''
        if (nextProps.list !== this.props.list) {
            this.setState({
                task: nextProps.list.length > 0 && nextProps.match.params.id ? nextProps.list.find((el) => el.id === +nextProps.match.params.id) : {
                    name: '',
                    description: '',
                    progress: '',
                    userDo: '',
                    role: ''
                }
            });
        } if (nextProps.users !== this.props.users) {
            this.setState({
                selectUsers: nextProps.users.filter(el => el.role === role)
            });
        }
    }

    handleChange(event) {
        const { name, value } = event.target;
        const task = { ...this.state.task };
        task[name] = value
        if (name === 'role') {
            this.setState({
                ...this.state,
                task,
                selectUsers: this.props.users.filter(el => el.role === event.target.value)
            });
        } else {
            this.setState({
                ...this.state,
                task
            });
        }
        console.log(this.state, this.props)
    }

    updateTodo(e) {
        e.preventDefault();
        console.log(this.props)
        if (this.props.match.path === '/dashboard/create') {
            API.post('/todo', this.createBody(this.state.task)).then(res => {
                this.props.addTodo(res.data)
            })
        } else {
            API.put(`/todo/${this.state.task.id}`, this.createBody(this.state.task)).then(res => {
                this.props.editTodo(res.data)
            })
        }
        this.props.history.goBack();
    }

    createBody(form) {
        return {
            id: form.id || '',
            name: form.name,
            description: form.description,
            progress: form.progress,
            userId: this.props.user.id,
            userDo: form.userDo,
            create: this.props.user.email,
            role: form.role
        }
    }

    renderSelect() {
        return <FormGroup>
            <Label for="userDoTask">User</Label>
            <Input type="select" name="userDo" id="userDoTask" value={this.state.task.userDo}
                onChange={(e) => this.handleChange(e)}>
                <option className="def-opt" disabled value="">Select value</option>
                {
                    this.state.selectUsers.map(el => {
                        return <option key={el.id} value={el.email}>{el.email}</option>
                    })
                }
            </Input>
        </FormGroup>
    }

    render() {
        console.log(this.state.task)
        return (

            <Form onSubmit={(e) => this.updateTodo(e)}>
                <FormGroup>
                    <Label for="nameTask">Task name</Label>
                    <Input type="text" name="name" require="true" id="nameTask" placeholder="Some task name" value={this.state.task.name}
                        onChange={(e) => this.handleChange(e, 'name')} />
                </FormGroup>
                <FormGroup>
                    <Label for="roleTask">Role</Label>
                    <Input type="select" name="role" id="roleTask" value={this.state.task.role}
                        onChange={(e) => this.handleChange(e)}>
                        <option className="def-opt" disabled value="">Select value</option>
                        <option value="Admin">Admin</option>
                        <option value="User">User</option>
                    </Input>
                </FormGroup>
                {
                    this.state.task.role !== '' ? this.renderSelect() : null
                }
                <FormGroup>
                    <Label for="progressTask">Progress</Label>
                    <Input type="select" name="progress" id="progressTask" value={this.state.task.progress}
                        onChange={(e) => this.handleChange(e, 'progress')}>
                        <option className="def-opt" disabled value="">Select value</option>
                        <option value="Not start">Not start</option>
                        <option value="In progress">In progress</option>
                        <option value="Completed">Completed</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="descrTask">Description</Label>
                    <Input type="textarea" name="description" id="descrTask" value={this.state.task.description}
                        onChange={(e) => this.handleChange(e, 'description')} />
                </FormGroup>
                <Button className="btn-success">Submit</Button>
            </Form>

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateEditForm));