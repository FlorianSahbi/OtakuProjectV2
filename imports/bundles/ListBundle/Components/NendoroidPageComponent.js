import React, { Component } from 'react';
import './NendoroidPageComponent.css';
import { Nendoroids } from '../Model/Nendoroids';
import { withTracker } from 'meteor/react-meteor-data';


class NendoroidPage extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.nendoroid) {
            return (
                <div>
                    <div className="nendoroidCardInnerBorder">
                        <span className="number">{console.log(this.props.nendoroid[0].number)}</span>
                        <span className="name">{console.log(this.props.nendoroid[0].name)}</span>
                        <span className="series">{console.log(this.props.nendoroid[0].series)}</span>
                    </div>
                </div>
            );
        }
    }
}

export default withTracker(() => {
    return {
        nendoroid: Nendoroids.find({ name: "Leonardo" }).fetch(),
    };
})(NendoroidPage);
