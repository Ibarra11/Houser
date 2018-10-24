import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
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
                .then(res => {
                    if (res.data === 'Login Successful') {
                        this.props.history.push('/houser');
                    }
                    else {
                        alert('Unsuccessful Login');
                    }
                })
                .catch(err => console.log(err))
        }
        else {
            axios.post('/api/signup', { email, password })
                .then((res) => {
                    if (res.data === 'Signup Successful') {
                        this.props.history.push('/houser');
                    }
                    else {
                        alert('Unsuccessful Signjup');
                    }
                })
                .catch(err => console.log(err));
        }
    }
    render() {
        return (
            <div className="component-landing-page">
                <nav className="nav">
                    <div className="nav-logo">
                        <h1><span><i className="fa fa-home"></i></span>ouser</h1>
                    </div>
                    <div className="nav-links">
                        <div className="nav-link">
                            <h3>Services</h3>
                        </div>
                        <div className="nav-link">
                            <h3><Link to='/payment'>Tenants</Link></h3>
                        </div>
                        <div className="nav-link">
                            <h3>Payments</h3>
                        </div>
                    </div>
                </nav>
                <header className="header">
                    <div className="header-container">
                        <div className="header-content">
                            <h1>Property Management</h1>
                            <h4>
                                Houser is a top of the line property management sys
                            </h4>
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
                <section className="services">
                    <div className="section-header">
                        <h3>Services</h3>
                    </div>
                    <div className="services-container">
                        <div className="service-box">
                            <div className="box-icon">
                                <i className="fa fa-home"></i>
                            </div>
                            <div className="box-header">
                                <h5>Property Management</h5>
                            </div>
                            <div className="box-description">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, deserunt.</p>
                            </div>
                        </div>
                        <div className="service-box">
                            <div className="box-icon">
                                <i className="fa fa-wrench"></i>
                            </div>
                            <div className="box-header">
                                <h5>Work Order History</h5>
                            </div>
                            <div className="box-description">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, rem?</p>
                            </div>
                        </div>
                        <div className="service-box">
                            <div className="box-icon">
                                <i className="fa fa-credit-card"></i>
                            </div>
                            <div className="box-header">
                                <h5>Transaction System</h5>
                            </div>
                            <div className="box-description">
                                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas, labore!</p>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <section className="contact">
                    <div className="section-header">
                        <h3>Contact</h3>
                    </div>
                    <div className="contact-container">
                        <div className="contact-info">

                        </div>
                        <div className="contact-form">

                        </div>
                    </div>
                </section> */}
            </div>
        )
    }
}

export default LandingPage;