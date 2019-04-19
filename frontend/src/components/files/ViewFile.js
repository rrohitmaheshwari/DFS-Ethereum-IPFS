import React, { Component } from 'react';
import {
    Card, Button, Typography
} from 'antd';

import File from './helper/File.js'
import './ViewFile.css';
import web3 from '../../web3';
import InboxFactory from '../../helper/build/InboxFactory.json';

const {Text} = Typography;

class ViewFile extends Component {


    state = {
        data: [{
            fromAddress: "self",
            toAddress: "self",
            hash: "hash",
            fileName: "File Name 1",
            timeStamp: "25 Jul 2018 04:44:15 GMT"
        }, {
            fromAddress: "other",
            toAddress: "self",
            hash: "hash",
            fileName: "File Name 2",
            timeStamp: "25 Aug 2018 05:44:15 GMT"
        }, {
            fromAddress: "self",
            toAddress: "other",
            hash: "hash",
            fileName: "File Name 3 very long to fit 1",
            timeStamp: "25 May 2019 06:44:15 GMT"
        },
            {
                fromAddress: "self",
                toAddress: "self",
                hash: "hash",
                fileName: "File Name 4",
                timeStamp: "25 Jul 2018 04:44:15 GMT"
            }, {
                fromAddress: "other",
                toAddress: "self",
                hash: "hash",
                fileName: "File Name 5",
                timeStamp: "25 Aug 2018 05:44:15 GMT"
            }, {
                fromAddress: "self",
                toAddress: "other",
                hash: "hash",
                fileName: "jFile Name 6 very long to fit 2",
                timeStamp: "25 May 2019 06:44:15 GMT"
            },

            {
                fromAddress: "self",
                toAddress: "self",
                hash: "hash",
                fileName: "File Name 7",
                timeStamp: "25 Jul 2018 04:44:15 GMT"
            }, {
                fromAddress: "other",
                toAddress: "self",
                hash: "hash",
                fileName: "File Name 8",
                timeStamp: "25 Aug 2018 05:44:15 GMT"
            }, {
                fromAddress: "self",
                toAddress: "other",
                hash: "hash",
                fileName: "File Name 9 very long to fit 3",
                timeStamp: "25 May 2019 06:44:15 GMT"
            },


        ]

    };

    async componentDidMount() {

        //to be fetched from config file or from the server
        const inboxFactoryAddress = '0xF06e6b002B451424265524354A3FA0D4A05d8036';

        let accounts = await web3.eth.getAccounts();
        console.log(accounts);
        console.log(JSON.parse(InboxFactory.interface));

        try {
            let instance = new web3.eth.Contract(
                JSON.parse(InboxFactory.interface),
                inboxFactoryAddress
            );

            console.log(instance);
            let inbox = await instance.methods.getDeployedInbox().call({from: accounts[0]});
            // const inbox2 = await instance.methods.deployedInbox({accounts}).call();

            console.log("inbox");
            console.log(inbox);
            // console.log("inbox2");
            // console.log(inbox2);
        }
        catch (err) {
            console.log("err")
            console.log(JSON.stringify(err))
        }


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
