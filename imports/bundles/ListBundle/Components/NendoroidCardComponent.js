import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Nendoroids } from '../Model/Nendoroids';
import { Link } from 'react-router-dom';
import './NendoroidCardComponent.css';

export default class NendoroidCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.nendoroid.name,
            number: this.props.nendoroid.number,
            series: this.props.nendoroid.series
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        const name = ReactDOM.findDOMNode(this.refs.nameInput).value.trim();
        const number = ReactDOM.findDOMNode(this.refs.numberInput).value.trim();
        const series = ReactDOM.findDOMNode(this.refs.seriesInput).value.trim();

        Nendoroids.update(this.props.nendoroid._id, {
            $set: { name: name, number: number, series: series, createdAt: new Date() },
        });
    }

    removeNendoroid() {
        Meteor.call('nendoroids.remove', this.props.nendoroid._id);
    }

    moreInformation() {
        let nendoId = this.props.nendoroid._id.toString();
        console.log(`nendoId Value = ${nendoId}`);
        return <Redirect className="nendoroidCardMoreInformations" to={`/information/${this.props.nendoroid._id}`} />
    }

    render() {
        return (
            <li className="nendoroidCard">
                <div className="nendoroidCardInnerBorder">
                    {this.props.currentUser && (
                        <div>
                            <button className="delete" onClick={this.removeNendoroid.bind(this)}>❌</button>
                            <button className="update" >✎</button>
                        </div>
                    )}

                    <span className="nendoroidCardNumber">{this.props.nendoroid.number}</span>
                    <span className="nendoroidCardName">{this.props.nendoroid.name}</span>
                    <Link className="nendoroidCardMoreInformations" to={`/information/${this.props.nendoroid._id}`}>Info</Link>
                    
                    <div className="nendoroidFormUpdate">
                        <form onSubmit={this.handleSubmit.bind(this)} >
                            <input className="editInputName editInput" type="text" ref="nameInput" defaultValue={this.state.name} />
                            <input className="editInputNumber editInput" type="number" ref="numberInput" defaultValue={this.state.number} />
                            <input className="editInputSeries editInput" type="text" ref="seriesInput" defaultValue={this.state.series} />
                            <input type="submit" />
                        </form>
                    </div>  
                </div>
            </li>
        );
    }
}