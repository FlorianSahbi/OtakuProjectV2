import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

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
        let pswCheck = password;
        let pswUser = currentUser[0].password;

        if (pswCheck === pswUser) { 
            localStorage.setItem("currentUser", currentUser[0].email); 
            return true;
        }
        else { return false }
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