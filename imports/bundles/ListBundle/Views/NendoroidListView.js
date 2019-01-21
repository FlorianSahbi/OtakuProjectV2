import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Nendoroids } from '../Model/Nendoroids';
import { Otakus } from '../../AuthBundle/Model/Otakus';
import { Link } from "react-router-dom";
import NendoroidCard from '../Components/NendoroidCardComponent';
import './NendoroidListView.css';

class NendoroidList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filter: null,
            showAddForm: false
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        // get value of input type by user then put those values in const
        const name = ReactDOM.findDOMNode(this.refs.nameInput).value.trim();
        const number = ReactDOM.findDOMNode(this.refs.numberInput).value.trim();
        const series = ReactDOM.findDOMNode(this.refs.seriesInput).value.trim();

        // create a document with values
        Meteor.call('nendoroids.insert', name, number, series);

        // then clear form's input
        ReactDOM.findDOMNode(this.refs.nameInput).value = '';
        ReactDOM.findDOMNode(this.refs.numberInput).value = '';
        ReactDOM.findDOMNode(this.refs.seriesInput).value = '';
    }

    signout(e) {
        e.preventDefault();
        // remove the localstorage with key currentUser then force a re render of the component
        // without any instance of localstorage the current user is just a visitor
        localStorage.removeItem("currentUser");
        this.forceUpdate()
    }

    filter(e) {
        e.preventDefault();
        // get value of nameFilterInput then clear the white space and replace uppercase by lowercase letter before setState filter with the value
        this.setState({ filter: ReactDOM.findDOMNode(this.refs.nameFilterInput).value.trim().toLowerCase() });
    }

    setFixture() {
        // populate the db with a set of data
        Meteor.call('nendoroids.populateDb');
    }

    showAddForm() {
        // toggle the boolean showAddForm used to display the add form or not
        this.setState({ showAddForm: !this.state.showAddForm })
    }

    renderNendoroids(filter) {
        // renderNendoroids according to the filter value
        // if no filter then render all the nendoroids card
        // else only render nendoroid matching the filter
        if (filter === null || filter === "") {
            return this.props.nendoroids.map(nendoroid => (
                <NendoroidCard key={nendoroid._id} nendoroid={nendoroid} currentUser={this.props.currentUser} />
            ));
        }
        else {
            let nendo = this.props.nendoroids.filter(nendoroid => nendoroid.name.toLowerCase().indexOf(filter) > -1);
            return nendo.map(nendoroid => (
                <NendoroidCard key={nendoroid._id} nendoroid={nendoroid} currentUser={this.props.currentUser} />
            ));
        }
    }

    render() {
        // used to show or hide the form
        const showForm = !this.state.showAddForm ? 'addForm hide' : 'addForm';
        return (
            <div className="container">
                <header>
                    <h1>Nendoroid List : {this.props.nendoroidsCpt}</h1>

                    {/* if localstorage:currentUser is null then ask the user to signin or signup */}
                    {localStorage.getItem('currentUser') === null && (
                        <div>
                            <Link className="authButton" to="/signin">signin</Link>
                            <span className="authButton">or</span>
                            <Link className="authButton" to="/signup">signup</Link>
                        </div>
                    )}

                    {/* else he is connected and he can signout */}
                    {localStorage.getItem('currentUser') !== null && (
                        <button className="authButton" onClick={this.signout.bind(this)}>
                            SignOut
                        </button>
                    )}

                    <button className="fixtureButton" onClick={this.setFixture.bind(this)}>FIXTURE</button>

                    <form onChange={this.filter.bind(this)} >
                        <input className="filterNendoroid" type="text" ref="nameFilterInput" placeholder="Filter by name" />
                    </form>

                    {/* if user is connected then he can access the button which toggle the showform */}
                    {localStorage.getItem('currentUser') !== null && (
                        <span className="addNendoroid" onClick={this.showAddForm.bind(this)}>➕</span>
                    )}

                    <div className={showForm}>
                        {/* if a user is connected he can access the form */}
                        {localStorage.getItem('currentUser') !== null && (
                            <form onSubmit={this.handleSubmit.bind(this)} >
                                <input className="addInputName addInput" type="text" ref="nameInput" placeholder="Name" />
                                <input className="addInputNumber addInput" type="number" ref="numberInput" placeholder="Number" />
                                <input className="addInputSeries addInput" type="text" ref="seriesInput" placeholder="Series" />
                                <input type="submit" />
                            </form>
                        )}
                    </div>

                </header>

                {/* render nendoroid card according to the filter set in the state of the component */}
                <div className="nendoroidList">
                    {this.renderNendoroids(this.state.filter)}
                </div>
            </div>
        );
    }
}

export default withTracker(() => {
    return {
        nendoroids: Nendoroids.find({ name: { $ne: "N/A" } }).fetch(),
        // Not used at this moment, will be used for a search by range number
        // nendo: Nendoroids.find({ $and: [{ name: { $ne: "N/A" } }, { number: { $gte: 0, $lte: 300 } }] }).fetch(),
        nendoroidsCpt: Nendoroids.find({}).count(),
        // when someone signin, create a new instance of  localStorage with key currentUser
        currentUser: Otakus.find({ email: localStorage.getItem('currentUser') }).fetch(),
    };
})(NendoroidList);