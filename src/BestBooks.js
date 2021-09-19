import axios from "axios";
import React, { Component } from "react";
import Carousel from "react-bootstrap/Carousel";

class BestBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      showdata:true,
      errorMessage:'book collection is empty',
      showError:false,
    };
  }

  componentDidMount = () => {
    axios.get("http://localhost:8020/books").then((res) => {
      this.setState({
        data: res.data,
      });
    }).catch((err)=>{
        this.setState({
            showdata:false,
            showError:true
        })
    })

    };

    render() {
        console.log(this.state.data);
    
        return (
          <div>
            <br /> <br /> <br /> <br />
            {this.state.showdata &&
              this.state.data.map((item) => {
                return (
                  <>
                    <h2> {item.title}</h2>
                    <h4> {item.description}</h4>
                    <h5> {item.status}</h5>
                    <h5> {item.email}</h5>
                    <br />
                    <hr />
                  </>
                );
              })}
              {this.state.showError && <h3>{this.state.errorMessage}</h3>}
          </div>
        );
      }
  };


export default BestBooks;
