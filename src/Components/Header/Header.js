import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { UserContext } from "../../App";
const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
// console.log( loggedInUser);
  return (
    <div>

      <Navbar className="bg-dark pl-5 pr-5" collapseOnSelect expand="lg" bg="success" variant="dark">
        <Navbar.Brand to="#home">Quick Rider</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Link className="nav-link" to="/home">Home</Link>
            <Link className="nav-link" to="/destination/Car">Destination</Link>
          </Nav>
          <Nav className="pr-5">
            <Link className="nav-link mr-3" to="/blog">Blog</Link>
            {
              loggedInUser.name ?
              <Link onClick={() => setLoggedInUser({})} className="nav-link bg-warning text-white mr-3" >
              Logout
            </Link> :
              <Link className="nav-link bg-warning text-white mr-3" to="/login">
              Login
            </Link>
            }
            <Link className="nav-link btn-success text-white" >Name: {loggedInUser.name}</Link>
            
          </Nav>
        </Navbar.Collapse>
      </Navbar>

    </div>
  );
};

export default Header;
