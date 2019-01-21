import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Fixture } from './Fixture';

export const Nendoroids = new Mongo.Collection('nendoroids');

Meteor.methods({

    // create and insert a nendo in db with a name a number and its series
    'nendoroids.insert'(name, number, series) {
        Nendoroids.insert({ name, number, series, createdAt: new Date() });
    },

    // remove a nendo using its id
    'nendoroids.remove'(nendoroidId) {
        Nendoroids.remove(nendoroidId);
    },

    // edit a nendo 
    'nendoroids.edit'(nendoroId, name, number, series) {
        Nendoroids.update(nendoroId, {
            $set: { name: name, number: number, series: series, createdAt: new Date() },
        });
    },

    // populate the db with a set of data
    // if this method is call many time then before insert check a nendo check if it already exists in db, if yes ignore its insertion
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