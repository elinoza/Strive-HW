import React from "react";
import SingleBook from "./SingleBook";
import AddComment from "../components/AddComment";
import CommentsList from "../components/CommentsList";
import { Form, Container, Row, Col } from "react-bootstrap";

class BookList extends React.Component {
  state = {
    booklist: [],
    selectedBook:{}
  };
componentDidMount= async()=>{

  try{ 
    let response= await fetch("http://localhost:3001/books")
    let booklist= await response.json()
    if (response.ok) {
      this.setState({ booklist:booklist})
      console.log(booklist)
    }
    else{
      console.log("response error")
    }
  }
  catch(error){console.log(error)}

}
  filterBookList = (input) => {
    this.setState({
      booklist: this.state.booklist.filter((book) =>
        book.title.toLowerCase().includes(input.toLowerCase())
      ),
    });
  };

  handleSelection=(item)=>{
    this.setState({
      selectedBook:item
    })
  }

  render() {
    return (
      <>
        <Container>
          <Row>
            <Col>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    onChange={(e) => this.filterBookList(e.target.value)}
                    type="text"
                    placeholder="Search for book"
                  />
                </Form.Group>
              </Form>
            </Col>
          </Row>
          <Row>
          <Col md={9}>
          <Row>
            {this.state.booklist.map((item) => (
              <SingleBook book={item} key={item.asin} onClick={() => this.handleSelection(item)} />
            ))}
             </Row>
            </Col>
            <Col md={3} >
             <AddComment elementId="1940026091" /> 
             <CommentsList elementId="1940026091" /> </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default BookList;
