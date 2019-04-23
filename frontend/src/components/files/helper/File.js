import React, { Component } from 'react';
import {
    Card, Typography
} from 'antd';
import { history } from "../../../helper/history";

const queryString = require('query-string');
const {Text} = Typography;

let gridStyle = {
    width: '17%',
    textAlign: 'center',
    margin: 10,
    padding: 10,
    borderRadius: '6px'
};

const gridStyleSent = {
    boxShadow: '0 2px 8px rgba(24, 144, 255, 0.35)',
};


const cardSent = {
    fontSize: 50,
    color: 'rgb(24, 144, 255)'
};


const gridStyleReceived = {
    boxShadow: '0 2px 8px rgba(76, 173, 129, 0.35)',
};

const cardReceived = {
    fontSize: 50,
    color: 'rgb(76, 173, 129)'
};


const gridStyleSelf = {
    boxShadow: '0 2px 8px rgba(250, 203, 20, 0.45)',
};


const cardSelf = {
    fontSize: 50,
    color: 'rgb(250, 203, 20)'
};

class File extends Component {

    onPress = (e) => {

        let data = this.props.data;

        history.push('/file?'+queryString.stringify(data));

        console.log("Pressed");
        console.log(data);


}


    render() {

        let cardStyle = {};
        let icon = "";

        if (this.props.type === "sent") {
            gridStyle = {...gridStyle, ...gridStyleSent};
            cardStyle = cardSent;
            icon = "fas fa-file-upload";
        } else if (this.props.type === "received") {
            gridStyle = {...gridStyle, ...gridStyleReceived};
            cardStyle = cardReceived;
            icon = "fas fa-file-download";
        } else {
            gridStyle = {...gridStyle, ...gridStyleSelf};
            cardStyle = cardSelf;
            icon = "fas fa-file-archive";
        }

        let data = this.props.data;

        return (


            <Card.Grid className="fileCard extraText" style={gridStyle} onClick={this.onPress}>

                <i className={icon} style={cardStyle}></i>
                <br/><br/>

                <Text strong>{data.fileName}</Text>
                <br/>

                <Text style={{fontSize: 10}}>{data.timeStamp}</Text>
                <br/>

            </Card.Grid>
        );


    }
}


export default File;
