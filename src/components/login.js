import React, { PureComponent } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import {
    Card, CardBody,
    CardTitle
} from 'reactstrap';
import '../styles/todo.scss';
import API from '../api';


class Login extends PureComponent {
    constructor(props) {
        super(props);
        if (props.match.path === '/singup') {
            this.state = {
                form: {
                    email: '',
                    password: '',
                    confirmpass: '',
                    id: null
                }
            }
        } else {
            this.state = {
                form: {
                    email: '',
                    password: '',
                    id: null
                }
            }
        }
    }

    handleChange(event, type) {
        const state = this.state;
        state.form[type] = event.target.value;
        this.setState({ state });
    }

    loginSingup(e, form) {
        e.preventDefault();
        if (this.props.match.path === '/singup') {
            if (form.password === form.confirmpass) {
                API.get(`/users`).then(res => {
                    const user = res.data.find(el => { return el.email === form.email });
                    if (!user) {
                        API.post(`/users`, this.createBody(form)).then(res => {
                            this.login(form)
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
                form.id = user.id
                this.setState({ form });
                this.props.logIn(JSON.stringify(form))
                this.props.history.push(`/dashboard/list`)
            }
        })
    }

    createBody(form) {
        return {
            email: form.email,
            password: form.password
        }
    }

    render() {
        if (this.props.match.path === '/login') {
            return (
                <div className="container form-container">
                    <Card>
                        <CardBody>
                            <CardTitle>Login</CardTitle>
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
                                <Button className="btn-success">Submit</Button>
                            </Form>
                        </CardBody>
                    </Card>
                </div>
            );
        } else {
            return (
                <div className="container form-container">
                    <Card>
                        <CardBody>
                            <CardTitle>Sing up</CardTitle>
                            <Form onSubmit={(e) => this.loginSingup(e, this.state.form)}>
                                <FormGroup>
                                    <Label for="email">Email</Label>
                                    <Input type="email" name="email" require="true" id="email" placeholder="example@gmail.com" value={this.state.form.email}
                                        onChange={(e) => this.handleChange(e, 'email')} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">Password</Label>
                                    <Input type="password" name="password" id="password" placeholder="password" value={this.state.form.password}
                                        onChange={(e) => this.handleChange(e, 'password')} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="confirm">Confirm password</Label>
                                    <Input type="password" name="password" id="confirm" placeholder="password" value={this.state.form.confirmpassword}
                                        onChange={(e) => this.handleChange(e, 'confirmpass')} />
                                </FormGroup>
                                <Button className="btn-success">Submit</Button>
                            </Form>
                        </CardBody>
                    </Card>
                </div>
            );
        }
    }
}

const mapStateToProps = (share) => {
    return {
        list: share.todos,
        user: share.user
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        logIn: (login) => dispatch({ type: 'LOGIN', login }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);