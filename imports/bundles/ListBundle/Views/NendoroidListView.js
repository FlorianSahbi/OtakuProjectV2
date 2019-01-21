import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Nendoroids } from '../Model/Nendoroids';
import NendoroidCard from '../Components/NendoroidCardComponent';
import './NendoroidListView.css';
import { Otakus } from '../../AuthBundle/Model/Otakus';
import { Link } from "react-router-dom";

class NendoroidList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filter: null,
            showAddForm: false
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        const name = ReactDOM.findDOMNode(this.refs.nameInput).value.trim();
        const number = ReactDOM.findDOMNode(this.refs.numberInput).value.trim();
        const series = ReactDOM.findDOMNode(this.refs.seriesInput).value.trim();

        Meteor.call('nendoroids.insert', name, number, series);

        ReactDOM.findDOMNode(this.refs.nameInput).value = '';
        ReactDOM.findDOMNode(this.refs.numberInput).value = '';
        ReactDOM.findDOMNode(this.refs.seriesInput).value = '';
    }

    signout(e) {
        e.preventDefault();
        localStorage.removeItem("currentUser");
        this.forceUpdate()
    }

    filter(e) {
        event.preventDefault(e);
        this.setState({ filter: ReactDOM.findDOMNode(this.refs.nameFilterInput).value.trim().toLowerCase() });
    }

    showFixture() {
        Meteor.call('nendoroids.populateDb');
    }

    showAddForm() {
        this.setState({ showAddForm: !this.state.showAddForm })
    }


    renderNendoroids(filter) {
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
        const taskClassName = !this.state.showAddForm ? 'addForm hide' : 'addForm';
        return (
            <div className="container">
                <header>
                    <h1>Nendoroid List : {this.props.nendoroidsCpt}</h1>

                    {console.log(localStorage.getItem('currentUser'))}

                    {localStorage.getItem('currentUser') === null && (
                        <div>
                            <Link to="/signin">signin</Link>
                            <span>or</span>
                            <Link to="/signup">signup</Link>
                        </div>
                    )}
                    {localStorage.getItem('currentUser') !== null  && (
                        <button onClick={this.signout.bind(this)}>
                            SignOut
                        </button>
                    )}

                    <button onClick={this.showFixture.bind(this)}>FIXTURE</button>
                    <form onChange={this.filter.bind(this)} >
                        <input className="filterNendoroid" type="text" ref="nameFilterInput" placeholder="Filter by name" />
                    </form>
                    <span className="addNendoroid" onClick={this.showAddForm.bind(this)}>Click here to add nendo ➕</span>

                    <div className={taskClassName}>
                        {this.props.currentUser && (
                            <form onSubmit={this.handleSubmit.bind(this)} >
                                <input className="addInputName addInput" type="text" ref="nameInput" placeholder="Name" />
                                <input className="addInputNumber addInput" type="number" ref="numberInput" placeholder="Number" />
                                <input className="addInputSeries addInput" type="text" ref="seriesInput" placeholder="Series" />
                                <input type="submit" />
                            </form>
                        )}
                    </div>
                </header>
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
        nendo: Nendoroids.find({ $and: [{ name: { $ne: "N/A" } }, { number: { $gte: 0, $lte: 300 } }] }).fetch(),
        nendoroidsCpt: Nendoroids.find({}).count(),
        currentUser: Otakus.find({ email: localStorage.getItem('currentUser') }).fetch(),
    };
})(NendoroidList);