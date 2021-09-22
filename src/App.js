import React, { Component } from "react";
import BestBooks from "./BestBooks";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "./components/Form";
import axios from "axios";
import UpdateForm from "./components/UpdateForm";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import { withAuth0 } from '@auth0/auth0-react';


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
      bookid: "",
      showUpdateForm: false,
      showAddForm: true,
    };
  }

  componentDidMount = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_PORT}/books`)
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
      .post(`${process.env.REACT_APP_BACKEND_PORT}/create-book`, {
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
    axios.delete(`${process.env.REACT_APP_BACKEND_PORT}/delete-book/${id}`).then((res) => {
      this.setState({
        data: res.data,
      });
    });
  };

  updateBook = (id, title, description, status, email) => {
    this.setState({
      bookid: id,
      showUpdateForm: true,
      showAddForm: false,
    });
  };
  handleUpdateBook = () => {
    axios
      .put(`${process.env.REACT_APP_BACKEND_PORT}/update-book/${this.state.bookid}`, {
        title: `${this.state.formTitle}`,
        description: `${this.state.formDescription}`,
        status: `${this.state.formStatus}`,
        email: `${this.state.formEmail}`,
      })
      .then((res) => {
        this.setState({
          data: res.data,
          showUpdateForm: false,
          showAddForm: true,
        });
      });
    console.log("dasdasdasda");
  };

  handleUpdateSubmit = (e) => {
    e.preventDefault();
    this.handleUpdateBook();
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
        <LoginButton/>
        <LogoutButton/>
        {this.state.showAddForm && (
          <Form
            handleTitle={this.handleTitle}
            handleDescription={this.handleDescription}
            handleStatus={this.handleStatus}
            handleEmail={this.handleEmail}
            handleSubmit={this.handleSubmit}
          />
        )}
        {this.state.showUpdateForm && (
          <UpdateForm
            handleTitle={this.handleTitle}
            handleDescription={this.handleDescription}
            handleStatus={this.handleStatus}
            handleEmail={this.handleEmail}
            handleUpdateSubmit={this.handleUpdateSubmit}
          />
        )}
        <BestBooks
          data={this.state.data}
          showdata={this.state.showdata}
          errorMessage={this.state.errorMessage}
          showError={this.state.showError}
          deleteBook={this.deleteBook}
          updateBook={this.updateBook}
        />
      </div>
    );
  }
}

export default withAuth0 (App);
