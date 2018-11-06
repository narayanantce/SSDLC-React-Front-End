import React, { Component } from "react";
import { css } from "aphrodite";
import { Redirect } from "react-router-dom";
import shajs from 'sha.js';

import { Styles } from "../styles/js/Styles";
import { ACTION_BACKEND_URL } from "../utils/Constants";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      formError: "hidden",
      error: "",
      redirect: false,
      company: null
    };

    this.login = this.login.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  login(e) {
    e.preventDefault();

    (async () => {

      let validateEmail = (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(String(this.state.email).toLowerCase()));

      if (validateEmail && this.state.password !== "") {
        e.preventDefault();

        const response = await fetch(ACTION_BACKEND_URL + "/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: this.state.email,
            password: shajs('sha512').update(this.state.password).digest('hex')
          })
        });

        let responsejson = await response.json();

        if (response.status === 200) {
          let token = responsejson.token;

          localStorage.setItem("AUTH_TOKEN", "Bearer " + token);
          localStorage.setItem("COMPANY", responsejson.user.COMPANY);

          alert("Logged In successfully");

          this.setState({ company: responsejson.user.COMPANY });
          this.setState({ redirect: true });
        } else {
          e.preventDefault();
          this.setState({ error: "Login failed : Invalid user credentials" });
          this.setState({ formError: css(Styles.formError) });
        }
      } else {
        e.preventDefault();
        this.setState({ formError: css(Styles.formError) });
        this.setState({ error: "Login failed : Invalid email/password" });
      }
    })();
  }

  render() {

    let token = localStorage.getItem("AUTH_TOKEN");
    let company = localStorage.getItem("COMPANY");

    if (token && company !== "null") {
      return <Redirect to="/joblist" />;
    }
    else if (token && company == "null") {
      return <Redirect to="/jobseeker" />;
    }

    if (this.state.redirect === true) {
      if (this.state.company !== null) {
        return <Redirect to="/joblist" />;
      } else {
        return <Redirect to="/jobseeker" />;
      }
    } else {
      return (
        <div className={"col-12 " + css(Styles.div)}>
          <div className={css(Styles.Panel, Styles.white)}>
            <center>
              <h1> Login </h1>
              <span className={this.state.formError}> {this.state.error} </span>
            </center>
            <form
              onSubmit={this.login}
              className={"col-md-12 " + css(Styles.form)}
            >
              <input
                className={css(Styles.input)}
                autoFocus
                onChange={this.onChange}
                type="email"
                placeholder="Email"
                id="email"
                autoComplete="off"
              />
              <br /> <br />
              <input
                className={css(Styles.input)}
                onChange={this.onChange}
                type="password"
                placeholder="Password"
                id="password"
                autoComplete="off"
              />{" "}
              <br /> <br />
              <button className={css(Styles.button)} type="submit">
                {" "}
                Login{" "}
              </button>
            </form>
          </div>
        </div>
      );
    }
  }
}

export default Login;
