import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
import { css } from "aphrodite";

import { Styles } from '../styles/js/Styles';

class JobSeeker extends Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
        };

        this.logOut = this.logOut.bind(this);
    }

    componentWillMount() {
        let token = localStorage.getItem('AUTH_TOKEN');
        if (token !== undefined && token != null) {
            this.setState({ redirect: true })
        }
    }

    logOut = () => {
        localStorage.clear();

        alert("Logged out successfully");

        this.props.history.push({
            pathname: "/"
        });

    };

    render() {

        if (this.state.redirect === false) {
            return (
                <Redirect to="/" />
            )
        } else {
            return (

                <div className={"col-12 " + css(Styles.div)}>
                    <div className={css(Styles.Panel, Styles.white)}>
                        <button className={css(Styles.button) + " " + css(Styles.buttonMarginLeftLogout)} onClick={this.logOut}>
                            Logout
                        </button>
                        <center>
                            <h1> Job Seeker Screen </h1>
                            <img src="//www.glassdoor.com/blog/app/uploads/sites/13/hire-me-sign.jpg" alt="Hire me" width="425" height="383"></img>
                        </center>
                    </div>
                </div>
            );
        }
    }
}

export default JobSeeker;