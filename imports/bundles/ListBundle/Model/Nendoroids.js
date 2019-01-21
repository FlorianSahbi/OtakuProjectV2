import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Fixture } from './Fixture';

export const Nendoroids = new Mongo.Collection('nendoroids');

Meteor.methods({

    'nendoroids.insert'(name, number, series) {
        Nendoroids.insert({ name, number, series, createdAt: new Date() });
    },

    'nendoroids.remove'(nendoroidId) {
        Nendoroids.remove(nendoroidId);
    },

    'nendoroids.edit'(nendoroId, name, number, series) {
        Nendoroids.update(nendoroId, {
            $set: { name: name, number: number, series: series, createdAt: new Date() },
        });
    },

    'nendoroids.populateDb'() {
        Fixture.map(nendo => {
            let nendoExist = Nendoroids.find({name: nendo.name}).fetch();
            if (nendoExist.length < 1) {
                Nendoroids.insert({
                    name: nendo.name,
                    number: nendo.number,
                    series: nendo.series,
                    price: nendo.price,
                    description: nendo.description,
                    image: nendo.image,
                    createdAt: new Date()
                });
            }
        })
    }
});