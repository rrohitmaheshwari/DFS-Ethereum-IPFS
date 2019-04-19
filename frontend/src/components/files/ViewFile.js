import React, { Component } from 'react';
import {
    Card, Button, Typography
} from 'antd';

import File from './helper/File.js'
import './ViewFile.css';
import web3 from '../../web3';
import InboxFactoryABI from '../../helper/build/InboxFactory.json';
import InboxABI from '../../helper/build/Inbox.json';

const {Text} = Typography;

class ViewFile extends Component {

    render() {

        const {selfAddress, fileType, data} = this.props; //get current public address

        let files = [];


        //filer file according to All File, Received Files, Sent Files, My Files
        for (let j = 0; j < data.length; j++) {
            if (fileType === "Sent Files" && data[j].toAddress !== selfAddress) {
                files.push(data[j])
            }
            else if (fileType === "Received Files" && data[j].fromAddress !== selfAddress) {
                files.push(data[j])
            }
            else if (fileType === "All Files") {
                files.push(data[j])
            }
            else if (fileType === "My Files" && data[j].fromAddress === data[j].toAddress) {
                files.push(data[j])
            }
        }


        return (
            <div className="AllFile">

                {/*<Empty style={{marginTop: '10%'}}/>*/}


                <Card bordered={false}
                      title={<div>
                          <Text strong> {fileType}</Text>
                          <Button className="float-right" type="primary" shape="round" icon="to-top"
                                  size='default'>New</Button>
                      </div>}
                >
                    {files.map((element, key) => {
                        if (element.fromAddress === element.toAddress) {
                            return (<File key={key} type={"self"} data={element}/>)
                        }
                        else if (element.fromAddress === selfAddress) {
                            return (<File key={key} type={"sent"} data={element}/>)
                        }
                        else {
                            return (<File key={key} type={"received"} data={element}/>)
                        }
                    })}
                </Card>


            </div>
        );
    }
}


export default ViewFile;
