import React, { Component } from "react";
import axios from "axios";
import { css } from "aphrodite";

import { confirmAlert } from "react-confirm-alert";
import { withRouter } from "react-router";
import Button from "@material-ui/core/Button";

import "react-confirm-alert/src/react-confirm-alert.css";

import { Styles } from "../styles/js/Styles";
import JobListTable from "./JobListTable";
import { ACTION_BACKEND_URL } from "../utils/Constants";

class JobList extends Component {
  constructor(props) {
    super(props);

    this.data = [
      {
        ID: 1,
        EMPLOYER_ID: 1,
        TITLE: "DUMMY JOB 1",
        DESCRIPTION: "JOB 1 DESCRIPTION",
        SKILLS: "SKILLS",
        EXPERIENCE: "EXP",
        LOCATION: "LOCATION",
        SALARY_RANGE: "1000 - 2000"
      },
      {
        ID: 2,
        EMPLOYER_ID: 1,
        TITLE: "DUMMY JOB 2",
        DESCRIPTION: "JOB 2 DESCRIPTION",
        SKILLS: "SKILLS",
        EXPERIENCE: "EXP",
        LOCATION: "LOCATION",
        SALARY_RANGE: "1000 - 2000"
      },
      {
        ID: 3,
        EMPLOYER_ID: 1,
        TITLE: "DUMMY JOB 3",
        DESCRIPTION: "JOB 3 DESCRIPTION",
        SKILLS: "SKILLS",
        EXPERIENCE: "EXP",
        LOCATION: "LOCATION",
        SALARY_RANGE: "1000 - 2000"
      }
    ];

    this.state = { data: this.data };

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
  }

  componentDidMount() {
    this.fetchjob();
  }

  fetchjob = () => {
    axios
      .get(`${ACTION_BACKEND_URL}/job/all`)
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
    return (
      <div>
        <div className={"col-12 " + css(Styles.div)}>
          <div className={css(Styles.Panel2, Styles.white)}>
            <h1 className={""}> Job List </h1>
            <div>
              <Button
                variant="contained"
                color="primary"
                style={{ marginBottom: 10 }}
                onClick={this.onCreateClick}
              >
                Create
              </Button>
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

export default withRouter(JobList);
