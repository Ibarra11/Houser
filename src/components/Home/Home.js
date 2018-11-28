import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { mainRoutes } from '../../routes';
class Home extends Component {

    constructor() {
        super();
    }

    componentDidMount() {
        console.log(window.location);
       
        // window.location.href = '/properties';
    }
    render() {
        if(window.location.hash === '#/houser'){
            window.location.hash += '/properties';
        }
        else if(window.location.hash === '#/houser/'){
            window.location.hash += 'properties';
        }
        return (
            <div className="component-home">
                <nav className="nav">
                    <div className="navbar-logo">
                        <h2>Houser</h2>
                    </div>
                    <ul className="nav-links">
                        <Link to='/houser/properties' className="link">Properties</Link>
                        <Link to='/houser/work-orders' className="link">Work Orders</Link>
                        <Link to='/houser/Transactions' className="link">Transactions</Link>
                        <Link to='/logout' className="link">Logout</Link>
                    </ul>
                </nav>
                <div className="views">
                    {mainRoutes()}
                </div>
            </div>
        )
    }
}

export default Home;