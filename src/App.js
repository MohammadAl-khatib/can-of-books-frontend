import React, { Component } from "react";
import BestBooks from "./BestBooks";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "./components/Form";
import axios from "axios";
import UpdateForm from "./components/UpdateForm";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import { withAuth0 } from "@auth0/auth0-react";
import Profile from "./components/Profile";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./components/Nav";

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

  deleteBook = (e,id) => {
    e.preventDefault();
    axios
      .delete(`${process.env.REACT_APP_BACKEND_PORT}/delete-book/${id}`)
      .then((res) => {
        this.setState({
          data: res.data,
        });
      });
  };

  updateBook = async (e,id) => {
    e.preventDefault();
    await this.handleUpdateBook(id); 
  };
  handleUpdateBook = (id) => {
    axios
      .put(
        `${process.env.REACT_APP_BACKEND_PORT}/update-book/${id}`,
        {
          title: `${this.state.formTitle}`,
          description: `${this.state.formDescription}`,
          status: `${this.state.formStatus}`,
          email: `${this.state.formEmail}`,
        }
      )
      .then( (res) => {
        this.setState({
          data: res.data,
          showUpdateForm: false,
          showAddForm: true,
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
      <Router>
        <Switch>
          <Route exact path="/profile">
            {this.props.auth0.isAuthenticated && (
              <Profile
                name={this.props.auth0.user.name}
                email={this.props.auth0.user.email}
                picture = {this.props.auth0.user.picture}
              />
            )}
          </Route>
          <Route exact path="/">
            {this.props.auth0.isAuthenticated && (
              <>
                {this.props.auth0.isAuthenticated && <Nav />}
                <LogoutButton />
              </>
            )}
            {!this.props.auth0.isAuthenticated && (
              <>
                <LoginButton />
              </>
            )}
            {this.state.showAddForm && this.props.auth0.isAuthenticated && (
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
            {this.props.auth0.isAuthenticated && (
              <BestBooks
                data={this.state.data}
                showdata={this.state.showdata}
                errorMessage={this.state.errorMessage}
                showError={this.state.showError}
                deleteBook={this.deleteBook}
                updateBook={this.updateBook}
                handleTitle={this.handleTitle}
                handleDescription={this.handleDescription}
              />
            )}
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default withAuth0(App);
