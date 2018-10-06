import React, { Component } from 'react';
import axios from 'axios';
class LandingPage extends Component {
    constructor() {
        super();
        this.state = {
            loginActive: false,
            signupActive: true,
            email: '',
            password: ''
        }
        this.toggleActive = this.toggleActive.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    };
    toggleActive() {
        this.setState({
            loginActive: !this.state.loginActive,
            signupActive: !this.state.signupActive
        })
    }
    onInputChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit(e) {
        e.preventDefault();
        let { email, password } = this.state;
        if (this.state.loginActive) {
            axios.post('/api/login', { email, password })
                .then((res) => {
                    if (res.data === 'Login Successful') {
                        this.props.history.push('/houser');
                    }
                    else{
                        alert('Unsuccessful Login');
                    }
                })
                .catch(err => console.log(err))
        }
        else {
            axios.post('/api/signup', { email, password })
                .then((res) => {
                    if(res.data === 'Signup Successful'){
                        this.props.history.push('/houser');
                    }
                    else{
                        alert('Unsuccessful Signjup');
                    }
                })
                .catch(err => console.log(err))
        }


    }
    render() {
        return (
            <div className="component-landing-page">
                <header className="header">
                    <div className="header-content">
                        <div className="header-logo">
                            <h1>Houser</h1>
                        </div>
                        <div className="header-form" >
                            <div className="header-form-type">
                                <div onClick={this.state.signupActive ? null : this.toggleActive} className={this.state.signupActive ? "form-controls signupActive" : "form-controls"}>Sign Up</div>
                                <div onClick={this.state.loginActive ? null : this.toggleActive} className={this.state.loginActive ? "form-controls loginActive" : "form-controls"}>Log In</div>
                            </div>
                            <div className="header-form-title">
                                <h2>{this.state.signupActive ? 'Sign Up for Free' : "Please Login"}</h2>
                            </div>
                            <div className="header-form-body">
                                <form onSubmit={this.onSubmit} >
                                    <div className="input-container">
                                        <input onChange={this.onInputChange} value={this.state.email} name="email" placeholder="Email*" type="email" />
                                    </div>
                                    <div className="input-container">
                                        <input onChange={this.onInputChange} value={this.state.password} name="password" placeholder="Password*" type="password" />
                                    </div>
                                    <div className="header-form-footer">
                                        <button type="submit"><h4>{this.state.signupActive ? 'Sign Up' : "Login"}</h4></button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        )
    }
}

export default LandingPage;