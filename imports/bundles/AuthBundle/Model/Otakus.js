import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

export const Otakus = new Mongo.Collection('otakus');

Meteor.methods({
    'otakus.signup'(username, email, password) {
        // TODO Crypt Password, salt and Bcrypt
        console.log(`Signup with username ${username} : email ${email} : password ${password}`);
        Otakus.insert({ username, email, password, createdAt: new Date() });
    },

    'otakus.signin'(email, password) {
        console.log(`Signin with email ${email} : password ${password}`);
        const currentUser = Otakus.find({ email: email }).fetch();
        console.log(currentUser);
        let pswCheck = password;
        let pswUser = currentUser[0].password;

        if (pswCheck === pswUser) { 
            console.log('psw match');
            localStorage.setItem("currentUser", currentUser[0].email); 

            window.location.replace("http://localhost:3000/");
          
        }
        else { console.error('psw doesnt match')}
    },

    'otakus.remove'(usernameId) {
        Otakus.remove(usernameId);
    },

    'otakus.edit'(usernameId, username, email, password) {
        Otakus.update(usernameId, {
            $set: { username: username, email: email, password: password, createdAt: new Date() },
        });
    }
});