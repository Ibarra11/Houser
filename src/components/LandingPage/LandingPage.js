import React, { Component } from 'react';

class LandingPage extends Component {
    constructor() {
        super();
        this.state = {
            loginActive: false,
            signupActive: true
        }
        this.toggleActive = this.toggleActive.bind(this);
    };

    toggleActive() {
        this.setState({
            loginActive: !this.state.loginActive,
            signupActive: !this.state.signupActive
        })
    }

    render() {
        return (
            <div className="component-landing-page">
                <header className="header">
                    <div className="header-content">
                        <div className="header-logo">
                            <h1>Houser</h1>
                        </div>
                        <div className="header-form">
                            <div className="header-form-type">
                                <div onClick={this.state.signupActive ? null : this.toggleActive} className={this.state.signupActive ? "form-controls signupActive" : "form-controls"}>Sign Up</div>
                                <div onClick={this.state.loginActive ? null : this.toggleActive} className={this.state.loginActive ? "form-controls loginActive" : "form-controls"}>Log In</div>
                            </div>
                            <div className="header-form-title">
                                <h2>{this.state.signupActive ? 'Sign Up for Free' : "Please Login"}</h2>
                            </div>
                            <div className="header-form-body">
                                <div className="input-name-container">
                                    <input name="firstName" placeholder="First Name*" type="text" />
                                    <input name="lastName" placeholder="Last Name*" type="text" />
                                </div>
                                <div className="input-container">
                                    <input name="email" placeholder="Email*" type="email" />
                                </div>
                                <div className="input-container">
                                    <input name="password" placeholder="Password*" type="password" />
                                </div>
                            </div>
                            <div className="header-form-footer">
                                <h4>{this.state.signupActive ? 'Sign Up' : "Login"}</h4>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        )
    }
}

export default LandingPage;