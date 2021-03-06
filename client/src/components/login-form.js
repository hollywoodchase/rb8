import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import '../App.css'

class LoginForm extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            redirectTo: null
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        console.log('handleSubmit')

        axios
            .post('/user/login', {
                username: this.state.username,
                password: this.state.password
            })
            .then(response => {
                console.log('login response: ')
                console.log(response)
                if (response.status === 200) {
                    // update App.js state
                    this.props.updateUser({
                        loggedIn: true,
                        username: response.data.username
                    })
                    // update the state to redirect to home
                    this.setState({
                        redirectTo: '/welcome'
                    })
                }
            }).catch(error => {
                console.log('login error: ')
                console.log(error);

            })
    }

    render() {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (

                <div className="login-page">
                    <form>
                        <h3 className="header">Login</h3>
                        <div className="form-body">
                            <label for="username">Username</label>
                            <input className="form-input"
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Username"
                                value={this.state.username}
                                onChange={this.handleChange}
                            />
                            <label for="password">Password</label>
                            <input className="form-input"
                                placeholder="password"
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                            />

                            <button onClick={this.handleSubmit} type="submit">Login</button>

                            <p className="error">{this.state.error ? this.state.errorMessage : ""}</p>
                            <p class="message">Not registered? <a href="/signup">Create an account</a></p>
                        </div>
                    </form>
                </div>
            )
        }
    }
}

export default LoginForm
