import React, { Component } from "react";
import axios from "axios";
import { css } from "aphrodite";
import { confirmAlert } from "react-confirm-alert";
import Button from "@material-ui/core/Button";

import "react-confirm-alert/src/react-confirm-alert.css";

import { Styles } from "./Styles";
import JobListTable from "./JobListTable";

const url = "http://localhost:7007";

class Login extends Component {
  constructor(props) {
    super(props);

    this.data = [
      {
        ID: 1,
        EMPLOYER_ID: 1,
        TITLE: "JOB 1",
        DESCRIPTION: "JOB 1 DESCRIPTION",
        SKILLS: "SKILLS",
        EXPERIENCE: "EXP",
        LOCATION: "LOCATION",
        SALARY_RANGE: "1000 - 2000"
      },
      {
        ID: 2,
        EMPLOYER_ID: 1,
        TITLE: "JOB 2",
        DESCRIPTION: "JOB 2 DESCRIPTION",
        SKILLS: "SKILLS",
        EXPERIENCE: "EXP",
        LOCATION: "LOCATION",
        SALARY_RANGE: "1000 - 2000"
      },
      {
        ID: 3,
        EMPLOYER_ID: 1,
        TITLE: "JOB 3",
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

  componentWillMount() {}

  componentDidMount() {
    this.fetchjob();
  }

  fetchjob = () => {
    axios
      .get(`${url}/job/all`)
      .then(response => {
        console.log(response.data.message);
        this.setState({
          data: response.data.message
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  onCreateClick = () => {
    alert("create");
  };

  onEditClick = row => e => {
    alert(`edit id ${row.ID}`);
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
      .delete(`${url}/job/${row.ID}`)
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

export default Login;
