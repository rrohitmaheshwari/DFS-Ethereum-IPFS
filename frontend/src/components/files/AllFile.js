import React, { Component } from 'react';
import {
    Card, Col, Row
} from 'antd';

import { Router, Route } from 'react-router-dom';
import './AllFiles.css';

const gridStyleSent = {
    width: '15%',
    textAlign: 'center',
    margin: 10,
    padding: 10,
    borderRadius: '6px',
    boxShadow: '0 2px 8px rgba(24, 144, 255, 0.35)',
};


const gridStyleReceived = {
    width: '15%',
    textAlign: 'center',
    margin: 10,
    padding: 10,
    borderRadius: '6px',
    boxShadow: '0 2px 8px rgba(76, 173, 129, 0.35)',
};

class AllFile extends Component {


    render() {


        return (
            <div className="AllFile">

                {/*<Empty style={{marginTop: '10%'}}/>*/}

                <Card title="All Files" bordered={false}>
                    <Card.Grid className="fileCard" style={gridStyleSent}><i className="fas fa-file-upload" style={{fontSize: 50, color: 'rgb(24, 144, 255)'}}></i><p>File
                        Name Sent</p></Card.Grid>
                    <Card.Grid className="fileCard" style={gridStyleReceived}><i className="fas fa-file-download" style={{fontSize: 50,color: 'rgb(76, 173, 129)'}}></i><p>File
                        Received</p></Card.Grid>
                    <Card.Grid style={gridStyleSent}>Content</Card.Grid>
                    <Card.Grid style={gridStyleSent}>Content</Card.Grid>
                    <Card.Grid style={gridStyleSent}>Content</Card.Grid>
                    <Card.Grid style={gridStyleSent}>Content</Card.Grid>
                    <Card.Grid style={gridStyleSent}>Content</Card.Grid>
                </Card>

            </div>
        );
    }
}


export default AllFile;
