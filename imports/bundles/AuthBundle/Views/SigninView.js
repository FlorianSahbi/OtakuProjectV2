import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Otakus } from '../Model/Otakus';
import './SigninView.css';

export default class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false
        }
    }

    handleSignin(event) {
        event.preventDefault();

        const email = ReactDOM.findDOMNode(this.refs.emailInput).value.trim();
        const password = ReactDOM.findDOMNode(this.refs.passwordInput).value.trim();

        Meteor.call('otakus.signin', email, password, (err, res) => {
            if (err) { console.error(err) }
            else { this.setState({ isLoggedIn: this.state.isLoggedIn = res }) }
        });

        ReactDOM.findDOMNode(this.refs.emailInput).value = '';
        ReactDOM.findDOMNode(this.refs.passwordInput).value = '';
    }

    render() {
        return (
            <section className="signupPage">
                <div className="signupWrapper">
                    <h1>Nendoroid</h1>
                    <p>Start to share your favorite Nendoroids and your collection with your friends !</p>
                    <form className="signupForm" onSubmit={this.handleSignin.bind(this)} >
                        <input className="signupInputEmail signupInput" type="email" ref="emailInput" placeholder="Email" />
                        <input className="signupInputPassword signupInput" type="password" ref="passwordInput" placeholder="Password" />
                        <input type="submit" />
                    </form>
                </div>
            </section>
        );
    }
}
