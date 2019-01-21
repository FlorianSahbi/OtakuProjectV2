import React, { Component } from 'react';
import './NendoroidPageComponent.css';
import { Nendoroids } from '../Model/Nendoroids';
import { withTracker } from 'meteor/react-meteor-data';


class NendoroidPage extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount(){
        console.log(this.props.match.params);
        console.log(this.props.match.params);
        console.log(this.props.match.params);
        console.log(this.props.match.params);
    }

    render() {
        return (
            <div>
                <div className="">
                    <span className="number">{console.log(this.props.nendoroid)}</span>
                </div>
            </div>
        );
    }
}

export default withTracker((params) => {
    return {
        nendoroid: Nendoroids.find({ name: params.match.params.nendoroid }).fetch(),
    };
})(NendoroidPage);
