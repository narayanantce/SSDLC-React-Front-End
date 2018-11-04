import React, { Component } from 'react'
import {Styles} from './Styles'
import {URL} from './Constants'

import {css} from "aphrodite";
import {Redirect} from "react-router-dom";

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: "",
            formError: "hidden",
            error: '',
            redirect: false
        };

        this.login = this.login.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {

        this.setState({[e.target.id]: e.target.value});
    }

    login(e) {

                
        (async () => {

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
            body : JSON.stringify({ 
                "email": this.state.email,
                "password": this.state.password
            })
        });

        let responsejson = await response.json();
        console.log(response.status);
        console.log(responsejson);

        if (response.status == 200) {
            let userid = responsejson.user.ID;
            let token = responsejson.token;

            console.log(userid);
            sessionStorage.setItem('AUTH_TOKEN', "Bearer "+token);
            alert("Logged In successfully");
            this.setState({redirect:true})
        } 
        else if(response.status == 500) {
            e.preventDefault();

            this.setState({error: "Internal Server Error"});
            this.setState({formError: css(Styles.formError)});
        }
        else if(response.status == 403) {
            e.preventDefault();

            this.setState({error: "Access Denied"});
            this.setState({formError: css(Styles.formError)});
        }
        else {
            e.preventDefault();

            this.setState({error: "Unexpected failure"});
            this.setState({formError: css(Styles.formError)});
        }
    } else {
        e.preventDefault();
        this.setState({formError: css(Styles.formError)});
        this.setState({error: 'Invalid credentials'})
    }
})();
       
}

    render() {

        if (this.state.redirect === true) {
            return(
                <Redirect to = "/createjob"/>
            )
        }
        else {

        return (         
          
            <div className={"col-12 " +css(Styles.div)}>
                <div className = {css(Styles.Panel, Styles.white)}>
                    <h1 className={""}> Log In </h1>
                    <span className = {this.state.formError}> {this.state.error} </span>
                    <form onSubmit = {this.login} className={"col-md-12 " +css(Styles.form)}>
                        <input  className={css(Styles.input)} autoFocus onChange = {this.onChange} type = "email" placeholder = "Email" id = "email" autoComplete = "off" />
                        <br /> <br />
                        <input className={css(Styles.input)} onChange = {this.onChange} type = "password" placeholder = "Password" id = "password" autoComplete = "off"/> <br /> <br />
                        <button className = {css(Styles.button)} type = "submit"> Login </button>
                    </form>
                </div>

            </div>
         );
        }
    }
}

export default Login;