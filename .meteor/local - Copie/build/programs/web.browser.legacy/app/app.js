var require = meteorInstall({"client":{"bundles":{"ListBundle":{"Components":{"NendoroidCardComponent.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                             //
// client/bundles/ListBundle/Components/NendoroidCardComponent.js                              //
//                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                               //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

module.export({
  "default": function () {
    return Nendoroid;
  }
});
var React, Component;
module.link("react", {
  "default": function (v) {
    React = v;
  },
  Component: function (v) {
    Component = v;
  }
}, 0);

var Nendoroid =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(Nendoroid, _Component);

  function Nendoroid() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = Nendoroid.prototype;

  _proto.render = function () {
    function render() {
      return React.createElement("li", null, this.props.nendoroid.name);
    }

    return render;
  }();

  return Nendoroid;
}(Component);
/////////////////////////////////////////////////////////////////////////////////////////////////

}}},"AuthBundle":{"accountsConfig.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                             //
// client/bundles/AuthBundle/accountsConfig.js                                                 //
//                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                               //
var Accounts;
module.link("meteor/accounts-base", {
  Accounts: function (v) {
    Accounts = v;
  }
}, 0);
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
});
/////////////////////////////////////////////////////////////////////////////////////////////////

}}},"routing.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                             //
// client/routing.js                                                                           //
//                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                               //
module.export({
  renderRoutes: function () {
    return renderRoutes;
  }
});
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 0);
var Router, Route, Switch;
module.link("react-router", {
  Router: function (v) {
    Router = v;
  },
  Route: function (v) {
    Route = v;
  },
  Switch: function (v) {
    Switch = v;
  }
}, 1);
var createBrowserHistory;
module.link("history/createBrowserHistory", {
  "default": function (v) {
    createBrowserHistory = v;
  }
}, 2);
var NendoroidCardComponent;
module.link("./bundles/ListBundle/Components/NendoroidCardComponent.js", {
  "default": function (v) {
    NendoroidCardComponent = v;
  }
}, 3);
var browserHistory = createBrowserHistory();

var renderRoutes = function () {
  return React.createElement(Router, {
    history: browserHistory
  }, React.createElement(Switch, null, React.createElement(Route, {
    exact: true,
    path: "/",
    component: NendoroidCardComponent
  })));
};
/////////////////////////////////////////////////////////////////////////////////////////////////

},"main.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                             //
// client/main.js                                                                              //
//                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                               //
var Meteor;
module.link("meteor/meteor", {
  Meteor: function (v) {
    Meteor = v;
  }
}, 0);
var render;
module.link("react-dom", {
  render: function (v) {
    render = v;
  }
}, 1);
var renderRoutes;
module.link("./routing.js", {
  renderRoutes: function (v) {
    renderRoutes = v;
  }
}, 2);
module.link("./bundles/AuthBundle/accountsConfig.js");
Meteor.startup(function () {
  render(renderRoutes(), document.getElementById('NendoApp'));
});
/////////////////////////////////////////////////////////////////////////////////////////////////

}}},{
  "extensions": [
    ".js",
    ".json",
    ".html",
    ".css"
  ]
});

var exports = require("/client/main.js");