import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"
import Login from "./Login"


class App extends Component {

    constructor() {
        super();
    }

    render() {
        return (
            <Router>
                <div className="App container">
                    <div>
                        <Route exact path = "/" component = {Login} />
                        {/* <Route exact path = "/predict" component = {JobSeeker} /> */}
                    </div>
                </div>
            </Router>
        );
    }
}



export default App;
