import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Otakus = new Mongo.Collection('otakus');

Meteor.methods({
    // Create a new user with an email, username and password
    'otakus.signup'(username, email, password) {
        // TODO Crypt Password, salt and Bcrypt
        console.log(`Signup with username ${username} : email ${email} : password ${password}`);
        Otakus.insert({ username, email, password, createdAt: new Date() });
        window.location.replace("http://localhost:3000/signin");
    },

    // When a user is trying to signin we ask him his password and email
    // email is used to find him in the db
    // and we check if the password enter by the user match with the password in the db
    // then create an instance of localstorage and redirect to the home 
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

    // remove a user by id
    'otakus.remove'(usernameId) {
        Otakus.remove(usernameId);
    },

    // edit the user's information, not implemented yet
    'otakus.edit'(usernameId, username, email, password) {
        Otakus.update(usernameId, {
            $set: { username: username, email: email, password: password, createdAt: new Date() },
        });
    }
});