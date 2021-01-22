import React from "react";
import { Navbar, Form, FormControl, Nav } from "react-bootstrap";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";

function Header() {
  return (
    <>
      <Navbar variant="dark" className="header">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src="https://mikekitko.com/wp-content/uploads/2019/10/amazon-logo-white.png"
            width="100"
            className="d-inline-block align-top"
          />{" "}
        </Navbar.Brand>
        <div className="header-search">
          <input className="header-searchInput" type="text" />
          <SearchIcon className="header_searchIcon" />
        </div>

        <Nav className="header_nav">
          <Nav.Link href="#deets" className="d-flex flex-column">
            <span className="header_optionOne"> Hello Guest</span>
            <span className="header_optionTwo"> Sign In</span>
          </Nav.Link>
          <Nav.Link  eventKey={2}  className="d-flex flex-column">
            <span className="header_optionOne"> Returns</span>
            <span className="header_optionTwo"> & Orders</span>
          </Nav.Link>
          <Nav.Link eventKey={2} href="#memes" className="d-flex flex-column">
            <span className="header_optionOne"> Your</span>
            <span className="header_optionTwo"> Prime </span>
          </Nav.Link>
          <div className="header_optionBasket">
            <ShoppingBasketIcon />
            <span className="header_optionTwo header_basketCount">0</span>
          </div>
        </Nav>
      </Navbar>
    </>
  );
}

export default Header;
