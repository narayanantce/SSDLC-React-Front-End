import React, { Component } from "react";
import { Styles } from "./Styles";
import { URL } from "./Constants";
import Select from "react-select";
import { SKILLS } from "./Dropdowns";
import { withRouter } from "react-router";

import { css } from "aphrodite";
import { Redirect } from "react-router-dom";

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
      redirect: false
    };

    this.handleSkillChange = this.handleSkillChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.submitJob = this.submitJob.bind(this);
  }

  handleSkillChange = skills_selected => {
    this.setState({ skills_selected });
    console.log(this.state);
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  componentWillMount() {
    let token = sessionStorage.getItem("AUTH_TOKEN");
    let company = sessionStorage.getItem("COMPANY");

    console.log(token);
    console.log(company);
    if (token && company != "null") {
      //alert("Setting redirect to true");
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
          description: state.data.DESCRIPTION,
          skills_selected: state.data.SKILL,
          experience: state.data.EXPERIENCE,
          location: state.data.LOCATION,
          salaryRange: state.data.SALARYRANGE,
          title: state.data.TITLE
        });
      }
    } else if (this.props.operation != undefined) {
      this.setState({ operation: this.props.operation });
    } else {
      this.setState({ operation: "Create" });
    }
    let skills_selected_json = {
      label: this.props.skills_selected,
      value: this.props.skills_selected
    };

    this.setState({ skills_selected: skills_selected_json });
    console.log(this.state);
    console.log(sessionStorage);
  }

  submitJob() {
    alert("Inside submitjob");
    (async () => {
      const response = await fetch(URL + "/job/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: {
          employer_id: "9",
          title: this.state.title,
          description: this.state.description,
          experience: this.state.experience,
          location: this.state.location,
          salary_range: this.state.salaryRange
        }
      });

      console.log(response);
    })();
  }
  render() {
    console.log(this.state);

    if (this.state.redirect === false) {
      return <Redirect to="/" />;
    } else {
      return (
        <div className={"col-12 " + css(Styles.div)}>
          <div className={css(Styles.Panel, Styles.white)}>
            <h1 className={""}> {this.state.operation} Job Posting </h1>
            <span className={this.state.formError}> {this.state.error} </span>
            <form
              onSubmit={this.submitJob}
              className={"col-md-12 " + css(Styles.form)}
            >
              Description
              <input
                className={css(Styles.input)}
                value={this.state.description}
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
                value={this.state.title}
                onChange={this.onChange}
                type="text"
                placeholder="eg. Software Engineer"
                id="title"
              />
              <br /> <br />
              Skills
              <Select
                options={this.state.skills}
                id="skills_selected"
                value={this.state.skills_selected}
                onChange={this.handleSkillChange}
                defaultValue="ITES"
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
          </div>
        </div>
      );
    }
  }
}

export default withRouter(CreateJob);
