import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { renderRoutes } from '../imports/routing.js';

Meteor.startup(() => {
  render(renderRoutes(), document.getElementById('NendoApp'));
});
