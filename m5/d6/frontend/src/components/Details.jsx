import React, { Component } from "react";
import { FaUser } from 'react-icons/fa';
import { TiDelete} from 'react-icons/ti';
import { RiEdit2Fill} from 'react-icons/ri';
import {
  Media,
  Container,
  Row,
  Col,
  Spinner,
  Alert,
  Form,
  Button,
  Badge,
  Card
} from "react-bootstrap";
export default class Details extends Component {
  state = {
    Review: {
      comment: "",
      rate: null,
      productId: this.props.match.params.id,
      userId:1
    },
    errMessage: "",
    loading: false,
    reviews: [],
    product:{}
  };

  fetchReviews = async () => {
    const url = process.env.REACT_APP_URL;
    try {
      
      const response = await fetch(`${url}/products/${this.state.Review.productId}/reviews`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        await this.setState({ reviews: data.Reviews, product:data });
        console.log(this.state.reviews);
      }
    } catch (e) {
      console.log(e);
      console.log(this.state.Review.projectId);
    }
  };
  componentDidMount = async () => {
    this.fetchReviews();
  };

  updateReviewField = (e) => {
    let Review = { ...this.state.Review };
    let currentId = e.currentTarget.id;
    Review[currentId] = e.currentTarget.value;
    this.setState({ Review: Review });
  };

  submitReview = async (e) => {
    const url = process.env.REACT_APP_URL;
    e.preventDefault();
    this.setState({ loading: true });
    try {
      let response = await fetch(`${url}/reviews`, {
        method: "POST",
        body: JSON.stringify(this.state.Review),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      });
      if (response.ok) {
        this.fetchReviews();
        alert("New Review saved!");
        this.setState({
          Review: {
            comment: "",
            rate: null,
            productId: this.props.match.params.id,
            userId:1
          },
          errMessage: "",
          loading: false,
        });
      } else {
        <Alert variant="danger">Something went wrong</Alert>;
        let error = await response.json();
        this.setState({
          errMessage: error.message,
          loading: false,
        });
      }
    } catch (e) {
      console.log(e);
      this.setState({
        errMessage: e.message,
        loading: false,
      });
    }
  };
  handleDelete = async (id) => {
    const url= process.env.REACT_APP_URL
    try {
     
      let response = await fetch(`${url}/reviews/${id}`, {
        method: "DELETE",
        headers: {},
      });
      if (response.ok) {
        alert("review deleted succesfully");
        this.handleClose();
      } else {
        alert("Something went wrong!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  editReview=async (reviewId)=>{
    const url = process.env.REACT_APP_URL;
    console.log(reviewId)
   
    this.setState({ loading: true });
    try {
      let response = await fetch(`${url}/reviews/${reviewId}`, {
        method: "PUT",
        body: JSON.stringify(this.state.Review),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      });
      if (response.ok) {
        this.fetchReviews();
        alert("review has been changed!");
        this.setState({
          Review: {
            comment: "",
            rate: null,
            productId: this.props.match.params.id,
            userId:1
          },
          errMessage: "",
          loading: false,
        });
      } else {
        <Alert variant="danger">Something went wrong</Alert>;
        let error = await response.json();
        this.setState({
          errMessage: error.message,
          loading: false,
        });
      }
    } catch (e) {
      console.log(e);
      this.setState({
        errMessage: e.message,
        loading: false,
      });
    }

  }
  render() {
    console.log(this.props);
    return (
      <>
        {this.state.loading && (
          <div className="d-flex justify-content-center my-5">
            <div className="ml-2">
              <Spinner animation="border" variant="success" />
            </div>
          </div>
        )}
        {this.state.errMessage ? (
          <Alert variant="danger">
            Something went wrong
            {this.state.errMessage}
          </Alert>
        ) : (
      


          <Container className="d-flex justify-content-center align-items-center text-center w-100">
         <Row>
         <Col lg={12} className="card_col">
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={this.state.product.image}/>
              <Card.Body>
                <Card.Title>{this.state.product.name}</Card.Title>
                <Card.Text>
                {this.state.product.description} 
                Brand:{this.state.product.brand}
                <p className="text-center text-muted">{this.state.product.price}</p>
                </Card.Text>
               
               
              </Card.Body>
            </Card>

            
            </Col>
            </Row>
 

            <Form
              className="w-100 mb-5 mt-5 d-flex justify-content-center align-items-center text-center"
              style={{ flexDirection: "column" }}
              onSubmit={this.submitReview}
            >
              <Col md={6}>
                <Form.Group>
                  <Form.Label htmlFor="comment">Comment</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    type="text"
                    name="comment"
                    id="comment"
                    placeholder="What do u think about this project?"
                    value={this.state.Review.comment}
                    onChange={this.updateReviewField}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label htmlFor="rate">Rate</Form.Label>
                  <Form.Control
                    type="number"
                    name="rate"
                    id="rate"
                    placeholder="Give it a rate.."
                    value={this.state.Review.rate}
                    onChange={this.updateReviewField}
                    required
                  />
                </Form.Group>
              </Col>
              <Button type="submit">Submit</Button>
            </Form>
      
          </Container>
        )}

        <Container>
       

          
          <h1 className="text-left my-4">Reviews</h1>
          {this.state.reviews &&
            this.state.reviews.map((e) => (
              <Media className="reviewMedia d-flex">
                <FaUser style={{fontSize:"35px"}}/>
                <Media.Body>
                  <h5>
                    {e.name} -- <Badge className="rateBadge">{e.rate}</Badge>
                  </h5>
                  <p>{e.comment}</p>
                  <p>User:{e.userId}</p>
                </Media.Body>
                <div className="ml-auto">
                <TiDelete   onClick={()=>this.handleDelete(e.id)} style={{fontSize:"35px",color:"red"}}/>
               <RiEdit2Fill onClick={()=>this.editReview(e.id)}  style={{fontSize:"35px", color:"green"}}/> 
                </div>
              </Media>
            ))}
        </Container>
      </>
    );
  }
}
