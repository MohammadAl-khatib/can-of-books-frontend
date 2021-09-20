import React, { Component } from "react";
import BestBooks from "./BestBooks";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "./components/Form";
import axios from "axios";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formTitle: "",
      formDescription: "",
      formStatus: "",
      formEmail: "",
      data: [],
      showdata: true,
      errorMessage: "book collection is empty",
      showError: false,
    };
  }

  componentDidMount = () => {
    axios
      .get("http://localhost:8020/books")
      .then((res) => {
        this.setState({
          data: res.data,
        });
      })
      .catch((err) => {
        this.setState({
          showdata: false,
          showError: true,
        });
      });
  };

  postBook = () =>
    axios
      .post("http://localhost:8020/create-book", {
        title: `${this.state.formTitle}`,
        description: `${this.state.formDescription}`,
        status: `${this.state.formStatus}`,
        email: `${this.state.formEmail}`,
      })
      .then((res) => {
        this.setState({
          data: res.data,
        });
      });

  deleteBook = (id) => {
    axios.delete(`http://localhost:8020/delete-book/${id}`).then(res=>{
      this.setState({
        data: res.data,
      });
    });
  };

  handleTitle = (e) => {
    this.setState({
      formTitle: e.target.value,
    });
  };

  handleDescription = (e) => {
    this.setState({
      formDescription: e.target.value,
    });
  };

  handleStatus = (e) => {
    this.setState({
      formStatus: e.target.value,
    });
  };

  handleEmail = (e) => {
    this.setState({
      formEmail: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.postBook();
  };

  render() {
    return (
      <div>
        <Form
          handleTitle={this.handleTitle}
          handleDescription={this.handleDescription}
          handleStatus={this.handleStatus}
          handleEmail={this.handleEmail}
          handleSubmit={this.handleSubmit}
        />
        <BestBooks
          data={this.state.data}
          showdata={this.state.showdata}
          errorMessage={this.state.errorMessage}
          showError={this.state.showError}
          deleteBook={this.deleteBook}
        />
      </div>
    );
  }
}

export default App;
