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
    }

    componentWillMount() {
        let token = sessionStorage.getItem('AUTH_TOKEN'); 
        console.log(token);
        if(token !== undefined) {
            this.setState({redirect:true})   
        }
    }

    render() {

        if (this.state.redirect === false) {
            return(
                <Redirect to = "/"/>
            )
        }
        else {

        return (
          
            <div className={"col-12 " +css(Styles.div)}>
                <div className = {css(Styles.Panel, Styles.white)}>
                    <h1 className={""}> {this.state.operation} Job Seeker screen </h1>
                </div>
            </div>
         );

        }
    }
}

export default JobSeeker;