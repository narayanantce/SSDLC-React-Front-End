import React, { Component } from 'react'
import {LoginStyles} from './Styles'
import {URL} from './Constants'

import {css} from "aphrodite";

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: "",
            formError: "hidden",
            error: '',
        };

        this.login = this.login.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {

        this.setState({[e.target.id]: e.target.value});
    }

async login(e) {

    const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    let validateEmail = emailRegex.test(String(this.state.email).toLowerCase());
    console.log(this.state);
    if (validateEmail && this.state.password != "") {
        e.preventDefault();

        const response = await fetch(URL + "/auth/login", {           
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body : {
                "email": this.state.email,
                "password": this.state.password
            }
        });

        //const responseData; 
        // =  await login(this.state.email,this.state.password)
        // if(responseData instanceof Error === false) {
        //     window.location.reload()
        // } else {
        //     e.preventDefault()
        //     this.setState({formError: css(LoginStyles.formError)});
        // }
    } else {
        e.preventDefault();
        this.setState({formError: css(LoginStyles.formError)});
        this.setState({error: 'Invalid credentials'})
    }

}

    
    render() {

        return (
          
            <div className={"col-12 " +css(LoginStyles.div)}>
                <div className = {css(LoginStyles.loginPanel, LoginStyles.white)}>
                    <h1 className={""}> Log In </h1>
                    <span className = {this.state.formError}> {this.state.error} </span>
                    <form onSubmit = {this.login} className={"col-md-12 " +css(LoginStyles.form)}>
                        <input  className={css(LoginStyles.input)} autoFocus onChange = {this.onChange} type = "email" placeholder = "Email" id = "email" autoComplete = "off" />
                        <br /> <br />
                        <input className={css(LoginStyles.input)} onChange = {this.onChange} type = "password" placeholder = "Password" id = "password" autoComplete = "off"/> <br /> <br />
                        <button className = {css(LoginStyles.button)} type = "submit"> Login </button>
                    </form>
                </div>

            </div>
         );
    }
}

export default Login;