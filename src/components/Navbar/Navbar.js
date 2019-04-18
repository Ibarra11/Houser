import React, { Component } from "react";
import { Link } from "react-router-dom";
import { mainRoutes } from "../../routes";
import axios from "axios";
class Navbar extends Component {
  constructor() {
    super();
    this.handleLogOut = this.handleLogOut.bind(this);
  }
  componentDidMount() {
    axios.get("/api/auth").then(res => {
      if (res.data === false) {
        this.props.history.push("/");
      }
    });
  }
  handleLogOut() {
    axios.post("/api/auth").then(() => {
      this.props.history.push("/");
    });
  }

  render() {
    return (
      <div className="component-home">
        <nav className="nav">
          <div className="navbar-logo">
            <h1>
              <Link className="link" to="/houser">
                <span>
                  <i className="fa fa-home" />
                </span>
                ouser
              </Link>
            </h1>
          </div>
          <ul className="nav-links">
            <Link to="/houser" className="link">
              Properties
            </Link>
            <Link to="/houser/work-orders" className="link">
              Work Orders
            </Link>
            <Link to="/houser/Transactions" className="link">
              Transactions
            </Link>
            {/* <Link to="/" className="link">
              Logout
            </Link> */}
            <button onClick={this.handleLogOut}>Logout</button>
          </ul>
        </nav>
        <div className="views">{mainRoutes()}</div>
      </div>
    );
  }
}

export default Navbar;
