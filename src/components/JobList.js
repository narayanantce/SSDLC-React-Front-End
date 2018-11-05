import React, { Component } from "react";
import axios from "axios";
import { css } from "aphrodite";
import jwtDecode from "jwt-decode";

import { confirmAlert } from "react-confirm-alert";
import { withRouter } from "react-router";
import Button from "@material-ui/core/Button";

import "react-confirm-alert/src/react-confirm-alert.css";

import { Styles } from "../styles/js/Styles";
import JobListTable from "./JobListTable";
import { ACTION_BACKEND_URL } from "../utils/Constants";

import { Redirect } from "react-router-dom";

class JobList extends Component {
  constructor(props) {
    super(props);

    this.data = [
    ];

    this.state = {
      data: this.data,
      redirect: false,
    };

    this.onCreateClick = this.onCreateClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.fetchjob = this.fetchjob.bind(this);
  }

  componentWillMount() {
    axios.defaults.headers.common["Authorization"] = sessionStorage.getItem(
      "AUTH_TOKEN"
    );

    let token = sessionStorage.getItem("AUTH_TOKEN");
    let company = sessionStorage.getItem("COMPANY");

    console.log(token);
    console.log(company);
    if (token && company !== "null") {
      this.setState({ redirect: true });
    }

  }

  componentDidMount() {
    this.fetchjob();
  }

  fetchjob = () => {

    let token = sessionStorage.getItem("AUTH_TOKEN");
    let decoded = jwtDecode(token);
    let employerID = decoded.ID;

    axios
      .get(`${ACTION_BACKEND_URL}/job/${employerID}`)
      .then(response => {
        this.setState({
          data: response.data.message
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  onCreateClick = () => {
    this.props.history.push({
      pathname: "/createjob"
    });
  };

  onEditClick = row => e => {
    this.props.history.push({
      pathname: "/createjob",
      state: { mode: "Edit", data: row }
    });
  };

  onDeleteClick = row => e => {
    confirmAlert({
      title: "Confirm to Delete",
      message: `Are you sure to do this job. (Job ID = ${row.ID})`,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            this.onDelete(row);
          }
        },
        {
          label: "No",
          onClick: null
        }
      ]
    });
  };

  onDelete = row => {
    axios
      .delete(`${ACTION_BACKEND_URL}/job/${row.ID}`)
      .then(res => {
        this.fetchjob();
      })
      .catch(err => console.log(err));
  };

  render() {

    if (this.state.redirect === false) {

      return <Redirect to="/" />;
    }
    else {

      return (
        <div>
          <div className={"col-12 " + css(Styles.div)}>
            <div className={css(Styles.Panel2, Styles.white)}>
              <div>
                <h1> Job List <Button
                  className={css(Styles.buttonMarginRight)}
                  variant="contained"
                  color="primary"
                  style={{ marginBottom: 10 }}
                  onClick={this.onCreateClick}
                >
                  Create
              </Button></h1>

                <JobListTable
                  data={this.state.data}
                  onEditClick={this.onEditClick}
                  onDeleteClick={this.onDeleteClick}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default withRouter(JobList);
