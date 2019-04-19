import React, { Component } from 'react';
import {
    Card, Button, Typography
} from 'antd';

import { Router, Route } from 'react-router-dom';
import File from './helper/File.js'
import './AllFiles.css';

const {Text} = Typography;

class AllFile extends Component {


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

    render() {
        console.log("AllFile-render");

        const selfAddress = "self"; //get current public address
        let files = this.state.data;


        return (
            <div className="AllFile">

                {/*<Empty style={{marginTop: '10%'}}/>*/}


                <Card bordered={false}
                      title={<div>
                          <Text strong> All Files</Text>
                          <Button className="float-right" type="primary" shape="round" icon="to-top"
                                  size='default'>New</Button>
                      </div>}
                >
                    {files.map((element,key) => {
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


export default AllFile;
