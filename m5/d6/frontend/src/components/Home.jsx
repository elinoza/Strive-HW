import React from "react";

import "./home.css";

import { Container, Jumbotron, Button, Row } from "react-bootstrap";
import AddProduct from "./AddProduct.jsx";
import Product from "./Product";

class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <Container fluid className=" px-0">
          <img
            className="home_image"
            src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2020/BlackFriday/Fuji_TallHero_BFWeek_v1_en_US_1x._CB415746974_.jpg"
            style={{ height: "600px", width: "100%" }}
            alt="home image"
          ></img>

          <Row>
            <AddProduct />

            <Row className="d-flex justify-content-around">
              <Product {...this.props} />
             
            </Row>
            {/* <div className="home_row">

         
        </div>
        <div className="home_row">

          <Product />
          <Product />
          <Product />

 GetProducts/Frontend
          <Product />
        </div> */}
          </Row>

          <div className="home_row"></div>
        </Container>
      </div>
    );
  }
}

export default Home;
