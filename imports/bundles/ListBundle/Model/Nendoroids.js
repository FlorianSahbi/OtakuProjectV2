import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Nendoroids = new Mongo.Collection('nendoroids');

Meteor.methods({
    'nendoroids.insert'(name, number, series) {
        // check(name, String);
        // check(number, Number);
        // check(series, String);

        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Nendoroids.insert({ name, number, series, createdAt: new Date() });
    },
    'nendoroids.remove'(nendoroidId) {
        check(nendoroidId, String);
        Nendoroids.remove(nendoroidId);
    },
    'nendoroids.edit'(nendoroId, name, number, series) {
        check(nendoroidId, String);
        check(name, String);
        check(number, Number);
        check(series, String);

        Nendoroids.update(nendoroId, {
            $set: { name: name, number: number, series: series, createdAt: new Date() },
        });
    },
});