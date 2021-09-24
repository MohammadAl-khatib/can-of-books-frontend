import React, { Component } from "react";
import Carousel from "react-bootstrap/Carousel";
import BookModal from "./components/BookModal";
import { Button } from "react-bootstrap";


class BestBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      item: {},
    };
  }
  ModalData = (item) => {
    this.setState({
      item: item,
    });
  };
  handleOpen = (item) => {
    this.setState({
      showModal: true,
    });
    this.ModalData(item);
  };
  handleClose = () => {
    this.setState({
      showModal: false,
    });
  };
  render() {
    return (
      <div>
        {this.props.showdata && (
          <Carousel style={{ width: "50%","marginTop":"20px" ,"marginLeft":"100px"}}>
            {this.props.data.map((item) => {
              return (
                <Carousel.Item >
                  <img
                    className="d-block w-100"
                    src="https://www.incimages.com/uploaded_files/image/1920x1080/getty_655998316_2000149920009280219_363765.jpg"
                    alt="First slide"
                  />
                  <Carousel.Caption style = {{"top":"100px"}}>
                    <h3 style={{ color: "black" }}>{item.title}</h3>
                    <p style={{ color: "black","fontWeight":"bold" }}>{item.description}</p>
                    <Button variant="light" onClick={() => this.handleOpen(item)}>
                      Edit Book
                    </Button>
                  </Carousel.Caption>
                </Carousel.Item>
              );
            })}
          </Carousel>
        )}
        <BookModal
          showModal={this.state.showModal}
          handleClose={this.handleClose}
          item={this.state.item}
          deleteBook={this.props.deleteBook}
          updateBook={this.props.updateBook}
          handleUpdateSubmit={this.props.handleUpdateSubmit}
          handleTitle={this.props.handleTitle}
          handleDescription={this.props.handleDescription}
        />
      </div>
    );
  }
}

export default BestBooks;
