import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import "./index.css";
import { Link } from "react-router-dom/cjs/react-router-dom";

class SignUp extends Component {
  state = {
    username: "",
    password: "",
    showSubmitError: false,
    errorMsg: "",
    signUpSuccess: false,
  };

  onChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  onSubmitSuccess = () => {
    this.setState({ signUpSuccess: true });
  };

  onSubmitFailure = (errorMsg) => {
    this.setState({ showSubmitError: true, errorMsg });
  };

  submitForm = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const userDetails = { username, password };
    const url = "http://localhost:3008/adminregister";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (response.ok) {
        this.onSubmitSuccess();
      } else {
        this.onSubmitFailure(
          data.error_msg || "Failed to sign up. Please try again."
        );
      }
    } catch (error) {
      console.error("Error signing up:", error);
      this.onSubmitFailure("Failed to sign up. Please try again.");
    }
  };

  renderPasswordField = () => {
    const { password } = this.state;
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          placeholder="Password"
          onChange={this.onChangePassword}
          autoComplete="new-password"
        />
      </>
    );
  };

  renderUsernameField = () => {
    const { username } = this.state;
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          placeholder="Username"
          value={username}
          onChange={this.onChangeUsername}
          autoComplete="username"
        />
      </>
    );
  };

  render() {
    const { showSubmitError, errorMsg, signUpSuccess } = this.state;

    if (signUpSuccess) {
      return <Redirect to="/" />;
    }

    return (
      <div className="signup-form-container">
        <form className="form-container" onSubmit={this.submitForm}>
          <h1 className="admin-login-heading"> Admin Signup </h1>
          <img
            src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/food-munch-img.png"
            className="login-website-logo-desktop-image"
            alt="website logo"
          />
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <button type="submit" className="button">
            Sign Up
          </button>
          <Link to="/adminlogin" className="sign-up">
            <button type="submit" className="button">
              Login
            </button>
          </Link>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    );
  }
}

export default SignUp;
