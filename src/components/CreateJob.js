import React, { Component } from "react";
import { withRouter } from "react-router";
import Select from "react-select";
import { Redirect } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { css } from "aphrodite";

import { Styles } from "../styles/js/Styles";
import { ACTION_BACKEND_URL, numberRegex } from "../utils/Constants";
import { SKILLS } from "../utils/Dropdowns";

class CreateJob extends Component {

  constructor(props) {
    super(props);

    this.state = {
      description: "",
      skills: SKILLS,
      skills_selected: "",
      experience: "",
      location: "",
      salaryRange: "",
      title: "",
      operation: "",
      userid: "",
      redirect: false,
      currentJobID: null,
      formError: "hidden",
      error: "",
      back: false,
    };

    this.handleSkillChange = this.handleSkillChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.submitJob = this.submitJob.bind(this);
    this.back = this.back.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  handleSkillChange = skills_selected => {
    this.setState({ skills_selected });

  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  componentWillMount() {
    let token = localStorage.getItem("AUTH_TOKEN");
    let company = localStorage.getItem("COMPANY");

    if (token && company !== "null") {
      this.setState({ redirect: true });
    }
  }

  componentDidMount() {
    this.setState({ skills: SKILLS });
    if (this.props.history.location.state !== undefined) {
      const { state } = this.props.history.location;
      if (state.mode !== undefined) {
        this.setState({
          operation: state.mode,
          currentJobID: state.data.ID,
          description: state.data.DESCRIPTION,
          skills_selected: {
            label: state.data.SKILLS,
            value: state.data.SKILLS
          },
          experience: state.data.EXPERIENCE,
          location: state.data.LOCATION,
          salaryRange: state.data.SALARY_RANGE,
          title: state.data.TITLE
        });
      }
    } else if (this.props.operation !== undefined) {
      this.setState({ operation: this.props.operation });
    } else {
      this.setState({ operation: "Create" });
    }
  }

  back() {
    this.setState({ back: true });
  }

  logOut = () => {
    localStorage.clear();

    alert("Logged out successfully");

    this.props.history.push({
      pathname: "/"
    });

  };

  submitJob(e) {

    e.preventDefault();

    let errors = false;

    this.setState({ formError: 'hidden' });
    this.setState({ error: "" });

    if (this.state.title == '' || this.state.skills_selected == '' || this.state.location == '') {
      this.setState({ formError: css(Styles.formError) });
      this.setState({ error: "Title/Skills/Location is missing" })
      errors = true;
    }

    else if (this.state.experience != '') {
      let validateExperience = numberRegex.test(this.state.experience);

      if (!validateExperience) {
        this.setState({ formError: css(Styles.formError) });
        this.setState({ error: "Please enter valid value for Experience" })
        errors = true;
      }
    }

    if (errors == false && this.state.salaryRange != '') {
      var salaries = this.state.salaryRange.split("-");

      let salaryFrom = numberRegex.test(salaries[0]);
      let salaryTo = numberRegex.test(salaries[1]);

      if (!salaryFrom || !salaryTo) {
        this.setState({ formError: css(Styles.formError) });
        this.setState({ error: "Please enter the salary range in valid format eg. 4000-5000" });
        errors = true;
      }

    }

    if (errors == false) {

      let token = localStorage.getItem("AUTH_TOKEN");
      let decoded = jwtDecode(token);
      let employer_id = decoded.ID;
      let method;
      let callingURL;
      if (this.state.operation === "Edit") {
        callingURL = '/job/' + this.state.currentJobID;
        method = 'PUT';
      } else {
        callingURL = '/job/add';
        method = 'POST';
      }
      (async () => {
        const response = await fetch(ACTION_BACKEND_URL + callingURL, {
          method,
          headers: {
            Authorization: token,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            employer_id: employer_id,
            title: this.state.title,
            description: this.state.description,
            skills: this.state.skills_selected.value,
            experience: this.state.experience,
            location: this.state.location,
            salary_range: this.state.salaryRange
          })
        });

        let responsejson = await response.json();
        if (responsejson.status === "Success") {
          alert("Job Posting " + this.state.operation + " successful");
          this.props.history.push("/joblist");
        }
        else {
          alert("Job Posting " + this.state.operation + " failed.");
        }
      })();
    }
  }

  render() {

    if (this.state.back === true) {

      return <Redirect to="/joblist" />;
    }
    if (this.state.redirect === false) {
      return <Redirect to="/" />;
    } else {
      return (
        <div className={"col-12 " + css(Styles.div)}>
          <div className={css(Styles.Panel, Styles.white)}>


            <button className={"col-md-1 " + css(Styles.button)} onClick={this.logOut}>
              {" "}
              LogOut
              </button>

            <br /><br />
            <button className={"col-md-1 " + css(Styles.button)} onClick={this.back}>
              {" "}
              Back
              </button>

            <center>
              <h1> {this.state.operation} Job Posting </h1>

            </center>

            <form
              onSubmit={this.submitJob}
              className={"col-md-12 " + css(Styles.form)}
            >
              Description
              <input
                className={css(Styles.input)}
                defaultValue={this.state.description}
                autoFocus
                onChange={this.onChange}
                type="text"
                placeholder="Job Description"
                id="description"
              />
              <br /> <br />
              Title
              <input
                className={css(Styles.input)}
                defaultValue={this.state.title}
                onChange={this.onChange}
                type="text"
                placeholder="eg. Software Engineer"
                id="title"
              />
              <br /> <br />
              Skills
              <Select
                options={this.state.skills}
                defaultValue={this.props.skills_selected}
                id="skills_selected"
                value={this.state.skills_selected}
                onChange={this.handleSkillChange}
              />
              <br /> <br />
              Experience (in years)
              <input
                className={css(Styles.input)}
                defaultValue={this.state.experience}
                onChange={this.onChange}
                type="text"
                placeholder="eg. 2"
                id="experience"
              />
              <br /> <br />
              Location
              <input
                className={css(Styles.input)}
                defaultValue={this.state.location}
                onChange={this.onChange}
                type="text"
                placeholder="eg. Singapore"
                id="location"
              />
              <br /> <br />
              Salary Range
              <input
                className={css(Styles.input)}
                defaultValue={this.state.salaryRange}
                onChange={this.onChange}
                type="text"
                placeholder="eg. 4000-5000"
                id="salaryRange"
              />
              <br /> <br />
              <button className={css(Styles.button)} type="submit">
                {" "}
                {this.state.operation} Job{" "}
              </button>
            </form>

            <br /><br />
            <div className="row justify-content-center">

              <span className={this.state.formError}>{this.state.error}</span>

            </div>
          </div>
        </div>
      );
    }
  }
}

export default withRouter(CreateJob);
