import React, { Component } from 'react';

class LandingPage extends Component {
    constructor() {
        super();
        this.state = {
            loginActive: false,
            signupActive: true,
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        }
        this.toggleActive = this.toggleActive.bind(this);
        this.formEnter = this.formEnter.bind(this);
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

    formEnter(e) {
        console.log(e.target.value);
    }

    onSubmit(e){
        e.preventDefault();
        console.log(this.state);
    }

    render() {
        return (
            <div className="component-landing-page">
                <header className="header">
                    <div className="header-content">
                        <div className="header-logo">
                            <h1>Houser</h1>
                        </div>
                        <div onKeyUp={this.formEnter} className="header-form" >
                            <div className="header-form-type">
                                <div onClick={this.state.signupActive ? null : this.toggleActive} className={this.state.signupActive ? "form-controls signupActive" : "form-controls"}>Sign Up</div>
                                <div onClick={this.state.loginActive ? null : this.toggleActive} className={this.state.loginActive ? "form-controls loginActive" : "form-controls"}>Log In</div>
                            </div>
                            <div className="header-form-title">
                                <h2>{this.state.signupActive ? 'Sign Up for Free' : "Please Login"}</h2>
                            </div>
                            <div className="header-form-body">
                                <form onSubmit={this.onSubmit} >
                                    <div className={this.state.loginActive ? "hidden" : "input-name-container"}>
                                        <input required onChange={this.onInputChange} value={this.state.firstName} name="firstName" placeholder="First Name*" type="text" />
                                        <input required onChange={this.onInputChange} value={this.state.lastName} name="lastName" placeholder="Last Name*" type="text" />
                                    </div>
                                    <div className="input-container">
                                        <input required onChange={this.onInputChange} value={this.state.email} name="email" placeholder="Email*" type="email" />
                                    </div>
                                    <div className="input-container">
                                        <input required onChange={this.onInputChange} value={this.state.password} name="password" placeholder="Password*" type="password" />
                                    </div>
                                    <div className="header-form-footer">
                                        <h4>{this.state.signupActive ? 'Sign Up' : "Login"}</h4>
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