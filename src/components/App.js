import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./Login";
import CreateJob from "./CreateJob";
import JobSeeker from "./JobSeeker";
import JobList from "./JobList";

class App extends Component {
  render() {
    return (
      <Router>
        <div className = "App container">
          <div>
            <Route exact path = "/" component = { Login } />
            <Route
              exact
              path="/createjob"
              render={props => (
                <CreateJob
                  description = "hello"
                  title = "Software Engr"
                  experience = "2"
                  location = "Chennai"
                  salaryRange = "4000-5000"
                />
              )}
            />
            }
            <Route exact path = "/jobseeker" component = { JobSeeker } />
            <Route exact path = "/joblist/" component = { JobList } />
            {/* <Route exact path = "/" render={props => <CreateJob operation='Edit' skills_selected='ITES' description='hello' title='Software Engr' experience='2' location='Chennai' salaryRange='4000-5000' />}/>} */}
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
