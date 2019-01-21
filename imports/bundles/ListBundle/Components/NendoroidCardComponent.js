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
            series: this.props.nendoroid.series,
            showEditForm: false
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        const name = ReactDOM.findDOMNode(this.refs.nameInput).value.trim();
        const number = ReactDOM.findDOMNode(this.refs.numberInput).value.trim();
        const series = ReactDOM.findDOMNode(this.refs.seriesInput).value.trim();

        Meteor.call('nendoroids.edit', this.props.nendoroid._id, name, number, series);

        this.setState({ showEditForm: false });
    }

    removeNendoroid() {
        Meteor.call('nendoroids.remove', this.props.nendoroid._id);
    }

    moreInformation() {
        let nendoId = this.props.nendoroid._id.toString();
        console.log(`nendoId Value = ${nendoId}`);
        return <Redirect className="nendoroidCardMoreInformations" to={`/information/${this.props.nendoroid._id}`} />
    }

    showEditForm() {
        this.setState({
            showEditForm: !this.state.showEditForm
        })
    }

    render() {
        const nendoClassName = !this.state.showEditForm ? 'nendoroidFormUpdate hide' : 'nendoroidFormUpdate';
        const nendoImage = { backgroundImage: `url(${this.props.nendoroid.image}${this.props.nendoroid.number}.jpg)` };
        return (
            <div className="nendoroidCard" style={nendoImage}>

                <div className="nendoroidCardInnerBorder">
                    {localStorage.getItem('currentUser') !== null && (
                        <div>
                            <button className="delete" onClick={this.removeNendoroid.bind(this)}>❌</button>
                            <button className="update" onClick={this.showEditForm.bind(this)}>✎</button>
                        </div>
                    )}

                    <span className="nendoroidCardNumber">{`#${this.props.nendoroid.number}`}</span>
                    <span className="nendoroidCardName">{this.props.nendoroid.name}</span>
                    <Link className="nendoroidCardMoreInformations" to={`/product/${this.props.nendoroid.name}`}>Info</Link>
                </div>

                <div className={nendoClassName}>
                    <form onSubmit={this.handleSubmit.bind(this)} >
                        <input className="editInputName editInput" type="text" ref="nameInput" defaultValue={this.state.name} />
                        <input className="editInputNumber editInput" type="number" ref="numberInput" defaultValue={this.state.number} />
                        <input className="editInputSeries editInput" type="text" ref="seriesInput" defaultValue={this.state.series} />
                        <input type="submit" />
                    </form>
                </div>
            </div>
        );
    }
}