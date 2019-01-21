import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Otakus } from '../Model/Otakus';
import './SignupView.css';

export default class Signup extends Component {

    handleSignup(event) {
        event.preventDefault();

        const username = ReactDOM.findDOMNode(this.refs.usernameInput).value.trim();
        const email = ReactDOM.findDOMNode(this.refs.emailInput).value.trim();
        const password = ReactDOM.findDOMNode(this.refs.passwordInput).value.trim();

        Meteor.call('otakus.signup', username, email, password);

        ReactDOM.findDOMNode(this.refs.usernameInput).value = '';
        ReactDOM.findDOMNode(this.refs.emailInput).value = '';
        ReactDOM.findDOMNode(this.refs.passwordInput).value = '';
    }

    render() {
        return (
            <section className="signupPage">
                <div className="signupWrapper">
                    <h1>Nendoroid</h1>
                    <p>Start to share your favorite Nendoroids and your collection with your friends !</p>
                    <form className="signupForm" onSubmit={this.handleSignup.bind(this)} >
                        <input className="addInputUsername signupInput" type="text" ref="usernameInput" placeholder="Username" />
                        <input className="signupInputEmail signupInput" type="email" ref="emailInput" placeholder="Email" />
                        <input className="signupInputPassword signupInput" type="password" ref="passwordInput" placeholder="Password" />
                        <input type="submit" />
                    </form>
                </div>
            </section>
        );
    }
}
