import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

class BookModal extends Component {

  render() {
    return (
      <>
        <Modal show={this.props.showModal} onHide={this.props.handleClose} style = {{"top":"100px"}} >
        <Modal.Header style = {{"display":"block"}} >
          <form>
                   <input type = "text" defaultValue = {this.props.item.title} onChange = {this.props.handleTitle}  style = {{"display":"block", "width":"350px", "fontSize":"18px", "fontWeight":"bold"}}/>
                   <textarea defaultValue = {this.props.item.description} onChange = {this.props.handleDescription} style = {{"display":"block","width":"350px","height":"200px"}}></textarea>
                   <Button variant="danger" style = {{"marginLeft":"5px", "marginTop":"5px"}} onClick={(e) => this.props.deleteBook(e,this.props.item._id)}>
                      Remove
                    </Button>
                    <Button variant="success" style = {{"marginLeft":"5px", "marginTop":"5px"}}
                      onClick={(e) =>
                        this.props.updateBook(e,this.props.item._id)}
                    >Update</Button>
               </form> 
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </>
    );
  }
}

export default BookModal;
