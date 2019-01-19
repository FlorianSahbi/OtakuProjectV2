import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import './Fixture';
import { Fixture } from './Fixture';

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
        //check(nendoroidId, String);
        //check(name, String);
        //check(number, Number);
        //check(series, String);

        Nendoroids.update(nendoroId, {
            $set: { name: name, number: number, series: series, createdAt: new Date() },
        });
    },

    'nendoroids.populateDb'() {
        Fixture.map(nendo => {
            Nendoroids.insert({
                name: nendo.name,
                number: nendo.number,
                series: nendo.series,
                price: nendo.price,
                description: nendo.description,
                image: nendo.image,
                createdAt: new Date()
            });
        })
    }
});