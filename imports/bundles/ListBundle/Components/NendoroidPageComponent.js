import React, { Component } from 'react';
import { Nendoroids } from '../Model/Nendoroids';
import { withTracker } from 'meteor/react-meteor-data';
import './NendoroidPageComponent.css';

class NendoroidPage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className="nendoroidPage">
                <div className="nendoroidPageWrapper">
                    <h1>{this.props.nendoroid.map(nendo => nendo.name)}</h1>
                    <img className="nendoroidPageImg" src={`http://floriansahbi.com/otakuProject/web/images/nendoroids/${this.props.nendoroid.map(nendo => nendo.number)}.jpg`}/>
                    <p className="nendoroidPageNumber">{"#" + this.props.nendoroid.map(nendo => nendo.number)}</p>
                </div>
            </section>
        );

    }
}

export default withTracker((router) => {
    return {
        nendoroid: Nendoroids.find({ name: router.match.params.nendoroid }).fetch(),
    };
})(NendoroidPage);
