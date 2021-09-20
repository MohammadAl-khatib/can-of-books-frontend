import axios from "axios";
import React, { Component } from "react";

class BestBooks extends Component {
    render() {    
        return (
          <div>
            <br /> <br /> <br /> <br />
            {this.props.showdata &&
              this.props.data.map((item) => {
                return (
                  <>
                    <h2> {item.title}</h2>
                    <h4> {item.description}</h4>
                    <h5> {item.status}</h5>
                    <h5> {item.email}</h5>
                    <button onClick = {()=>this.props.deleteBook(item._id)}>Remove</button>
                    <br />
                    <hr />
                  </>
                );
              })}
              {this.props.showError && <h3>{this.props.errorMessage}</h3>}
          </div>
        );
      }
  };


export default BestBooks;
