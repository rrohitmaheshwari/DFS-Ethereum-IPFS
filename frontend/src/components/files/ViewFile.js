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


    state = {
        data: []
    };

    async componentDidMount() {

        //to be fetched from config file or from the server
        const inboxFactoryAddress = '0xF06e6b002B451424265524354A3FA0D4A05d8036';

        let accounts = await web3.eth.getAccounts();


        let instanceInboxFactory = new web3.eth.Contract(
            JSON.parse(InboxFactoryABI.interface),
            inboxFactoryAddress
        );

        let inboxAddress = await instanceInboxFactory.methods.getDeployedInbox().call({from: accounts[0]});

        console.log(inboxAddress);

        let instanceInbox = new web3.eth.Contract(
            JSON.parse(InboxABI.interface),
            inboxAddress
        );

        let inboxDataCount = await instanceInbox.methods.getMessagesCount().call({from: accounts[0]});
        console.log(inboxDataCount);


        const inboxData = await Promise.all(
            Array(parseInt(inboxDataCount))
                .fill()
                .map((element, index) => {
                    return instanceInbox.methods.getMessages(index).call({from: accounts[0]});
                })
        );

        let temp = [];
        for (let i = 0; i < inboxData.length; i++) {
            let tempObj = {};
            tempObj.fromAddress = inboxData[i][0];
            tempObj.toAddress = inboxData[i][1];
            tempObj.hash = inboxData[i][2];
            tempObj.fileName = inboxData[i][3];
            tempObj.timeStamp = inboxData[i][4];
            temp.push(tempObj);
        }
        this.setState({data: temp});


    }

    render() {
        console.log("AllFile-render");

        const selfAddress = "self"; //get current public address
        let files = [];
        const fileType = this.props.fileType;

        //filer file according to All File, Received Files, Sent Files, My Files
        for (let j = 0; j < this.state.data.length; j++) {
            if (fileType === "Sent Files" && this.state.data[j].toAddress !== selfAddress) {
                files.push(this.state.data[j])
            }
            else if (fileType === "Received Files" && this.state.data[j].fromAddress !== selfAddress) {
                files.push(this.state.data[j])
            }
            else if (fileType === "All Files") {
                files.push(this.state.data[j])
            }
            else if (fileType === "My Files" && this.state.data[j].fromAddress === this.state.data[j].toAddress) {
                files.push(this.state.data[j])
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
