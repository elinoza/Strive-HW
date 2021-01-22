import React from "react";
import "./product.css";
import { Card, Col,  Alert,Button } from "react-bootstrap";
import { TiDelete} from 'react-icons/ti';
import { RiEdit2Fill} from 'react-icons/ri';

class Product extends React.Component {
  state = { products: [], loading: true };

  fetchProducts = async () => {
    this.setState({ loading: true });
    const url= process.env.REACT_APP_URL
    try {
      const response = await fetch(`${url}/products`);
      let products = await response.json();
      console.log(products);
      if (response.ok) {
        this.setState({ products, loading: false });
      } else {
        this.setState({ loading: false });
        <Alert variant="danger">Something went wrong</Alert>;
      }
    } catch (error) {
      console.log(error);
    }
  };
  componentDidMount = () => {
    this.fetchProducts();
  };

  handleDelete = async (id) => {
    const url= process.env.REACT_APP_URL
    try {
      
      let response = await fetch(`${url}/products/${id}`, {
        method: "DELETE",
        headers: {},
      });
      if (response.ok) {
        alert("product deleted succesfully");
        this.fetchProducts()
        
      } else {
        alert("Something went wrong!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    console.log(this.props.history);
    return (
      <>
        {this.state.products.map((product) => (
          <div className="card_container"  >
            <Col sm={6} md={3} lg={4} className="card_col">
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={product.image}/>
              <Card.Body >
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                {product.description} 
                Brand:{product.brand}
                <p className="text-center text-muted">{product.price}</p>
                </Card.Text>
                <p className="text-center text-muted">{product.price}</p>
                <Button variant="danger" onClick={() =>
            this.props.history.push(`/details/${product.id}`)
          }>Go to details</Button>
          <div className="ml-auto">
                <TiDelete   onClick={()=>this.handleDelete(product.id)} style={{fontSize:"16px",color:"red"}}/>
               {/* <RiEdit2Fill onClick={()=>this.editReview(product.id)}  style={{fontSize:"16px", color:"green"}}/>  */}
                </div>
              </Card.Body>
            </Card>

            </Col>
          </div>
        ))}
      </>
    );
  }
}
export default Product;
