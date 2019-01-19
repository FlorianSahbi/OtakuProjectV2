import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Nendoroids } from '../Model/Nendoroids';
import NendoroidCard from '../Components/NendoroidCardComponent';
import './NendoroidListView.css';
import AccountsUIWrapper from '../../AuthBundle/AccountsUIWrapper';

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

    filter(e) {
        event.preventDefault(e);
        this.setState({ filter: ReactDOM.findDOMNode(this.refs.nameFilterInput).value.trim().toLowerCase() });
    }

    showFixture() {
        Meteor.call('nendoroids.populateDb');
    }

    showAddForm() {
        this.setState({
            showAddForm: !this.state.showAddForm
        })
    }

    renderNendoroids(filter) {
        if (filter === null || filter === "") {
            return this.props.nendoroids.map(nendoroid => (
                <NendoroidCard key={nendoroid._id} nendoroid={nendoroid} currentUser={this.props.loggedInUser} />
            ));
        }
        else {
            let nendo = this.props.nendoroids.filter(nendoroid => nendoroid.name.toLowerCase().indexOf(filter) > -1);
            return nendo.map(nendoroid => (
                <NendoroidCard key={nendoroid._id} nendoroid={nendoroid} currentUser={this.props.loggedInUser} />
            ));
        }
    }

    render() {
        const taskClassName = !this.state.showAddForm ? 'addForm hide' : 'addForm';
        return (
            <div className="container">
                <header>
                    <h1>Nendoroid List : {this.props.nendoroidsCpt}</h1>
                    <AccountsUIWrapper />
                    <button onClick={this.showFixture.bind(this)}>FIXTURE</button>
                    <form onChange={this.filter.bind(this)} >
                        <input className="filterNendoroid" type="text" ref="nameFilterInput" placeholder="Filter by name" />
                    </form>
                    <span className="addNendoroid" onClick={this.showAddForm.bind(this)}>➕</span>

                    <div className={taskClassName}>
                        {this.props.loggedInUser && (
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
        nendoroids: Nendoroids.find({}).fetch(),
        nendoroidsCpt: Nendoroids.find({}).count(),
        loggedInUser: Meteor.user(),
    };
})(NendoroidList);