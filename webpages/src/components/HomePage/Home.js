import React, { Component } from "react";
import { Link, Outlet } from "react-router-dom";
import "./Home.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDropdownOpen: false,
      redirectToRegistration: false,
      redirectToLogin: false,
      isSidebarOpen: false,
    };
  }
  toggleSidebar = () => {
    this.setState((prevState) => ({
      isSidebarOpen: !prevState.isSidebarOpen,
    }));
  };
  toggleDropdown = () => {
    this.setState((prevState) => ({
      isDropdownOpen: !prevState.isDropdownOpen,
    }));
  };

  render() {
    const { isDropdownOpen, isSidebarOpen } = this.state;
    const buttonClass = isDropdownOpen ? "upArrow" : "downArrow";
    return (
      <>
        <div>
          <nav className="navbar">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/home" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/home/services" className="nav-link">
                  Services
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/home/about-us" className="nav-link">
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/home/contact-us" className="nav-link">
                  Contact Us
                </Link>
              </li>
              <li className="nav-item">
                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                  className={buttonClass}
                  onClick={this.toggleDropdown}
                >
                  Profile
                </div>
                {isDropdownOpen && (
                  <div className="dropdown-menu">
                    <Link to="/Registration" className="nav-link">
                      <button>Settings</button>
                    </Link>
                    <Link to="/" className="nav-link">
                      <button>Log Out</button>
                    </Link>
                  </div>
                )}
              </li>
            </ul>
          </nav>
          <Outlet />
        </div>
      </>
    );
  }
}

export default Home;
