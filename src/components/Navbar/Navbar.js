import React from 'react';
import { Link } from 'react-router-dom';
import { mainRoutes } from '../../routes';
const Navbar = function () {
    return (
        <div className="component-home">
            <nav className="nav">
                <div className="navbar-logo">
                    <h1><Link className="link" to='/houser'><span><i className="fa fa-home"></i></span>ouser</Link></h1>
                </div>
                <ul className="nav-links">
                    <Link to='/houser' className="link">Properties</Link>
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


export default Navbar;