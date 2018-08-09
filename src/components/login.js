import React, { PureComponent } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import {
    Card, CardBody,
    CardTitle
} from 'reactstrap';
import '../styles/todo.scss';
import API from '../api';

const roleAdmin = ['Admin', 'Root']
class Login extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                email: '',
                password: ''
            }
        }
        if (props.match.path === '/singup') {
            this.state.form = { ...this.state.form, confirmpass: '' }
        }
        // this.props.history.listen((res) => {
        //     this.setState({
        //         form: {
        //             email: '',
        //             password: ''
        //         }
        //     });
        // })
    }

    componentWillUpdate(nextProps, state) {
        if (this.props.match.path !== nextProps.match.path) {
            if (nextProps.match.path === '/singup') {
                this.setState({
                    form: {
                        email: '',
                        password: '',
                        confirmpass: ''
                    }
                });
            } else {
                this.setState({
                    form: {
                        email: '',
                        password: ''
                    }
                });
            }
        }
    }

    handleChange(event, type) {
        const form = { ...this.state.form };
        form[type] = event.target.value;
        this.setState({ form });
    }

    loginSingup(e, form) {
        e.preventDefault();
        if (this.props.match.path === '/singup') {
            if (form.password === form.confirmpass) {
                API.get(`/users`).then(res => {
                    const user = res.data.find(el => { return el.email === form.email });
                    if (!user) {
                        const body = { ...form, role: 'User' }
                        API.post(`/users`, this.createBody(body)).then(res => {
                            this.login(body)
                        })
                    } else {
                        console.log('user is already have')
                    }
                })
            }
        } else {
            this.login(form);
        }
    }

    login(form) {
        API.get(`/users`).then(res => {
            const user = res.data.find(el => { return el.email === form.email });
            if (user !== undefined && user.password === form.password) {
                this.setState({ form });
                form = { ...form, id: user.id, role: user.role }
                this.props.logIn(form)
                console.log(form)
                API.get(`todo`).then(res => {
                    let list = res.data
                    if (!roleAdmin.includes(form.role)) {
                        list = res.data.filter(el => el.userDo === form.email)
                    }
                    this.props.setTodos(list)
                    console.log(form, this.props)
                    this.props.history.push(`/dashboard/list`)
                })
            }
        })
    }

    createBody(form) {
        return {
            email: form.email,
            password: form.password
        }
    }

    forRender() {
        return (
            <FormGroup>
                <Label for="confirm">Confirm password</Label>
                <Input type="password" name="password" id="confirm" placeholder="password" value={this.state.form.confirmpassword}
                    onChange={(e) => this.handleChange(e, 'confirmpass')} />
            </FormGroup>
        );
    }

    render() {
        return (
            <div className="container form-container">
                <Card>
                    <CardBody>
                        <CardTitle>
                            {
                                this.props.match.path === '/singup' ? 'Sing up' : 'Login'
                            }
                        </CardTitle>
                        <Form onSubmit={(e) => this.loginSingup(e, this.state.form)}>
                            <FormGroup>
                                <Label for="nameTask">Email</Label>
                                <Input type="email" name="email" require="true" id="nameTask" placeholder="example@gmail.com" value={this.state.form.email}
                                    onChange={(e) => this.handleChange(e, 'email')} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="titleTask">Password</Label>
                                <Input type="password" name="password" id="titleTask" placeholder="password" value={this.state.form.password}
                                    onChange={(e) => this.handleChange(e, 'password')} />
                            </FormGroup>
                            {
                                this.props.match.path === '/singup' ? this.forRender() : null
                            }
                            <Button className="btn-success">Submit</Button>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = (share) => {
    return {
        user: share.user,
        list: share.todos
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        logIn: (login) => dispatch({ type: 'LOGIN', login }),
        setTodos: (todos) => dispatch({ type: 'SET_TODOS', todos }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);