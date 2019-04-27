import React, { Component } from 'react';
import {
    Card, Button, Typography, Empty
} from 'antd';

import File from './helper/File.js'
import './ViewFile.css';
import { history } from "../../helper/history";

const {Text} = Typography;

class ViewFile extends Component {

    render() {

        const {selfAddress, fileType, data} = this.props; //get current public address

        let files = [];


        //filer file according to All File, Received Files, Sent Files, My Files
        for (let j = data.length - 1; j >= 0; j--) {
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

        let isEmpty = false;
        if (data.length === 0) {

            isEmpty = true;
        }


        return (
            <div className="AllFile">


                <Card bordered={false}
                      loading={this.props.loading}
                      title={<div>
                          <Text strong> {fileType}</Text>
                          <Button className="float-right" type="primary" shape="round" icon="file-add"
                                  size='default' onClick={(event) => {
                              console.log('/home/newFile');
                              history.push('/home/newFile');
                          }}>New</Button>
                      </div>}
                >

                    {isEmpty &&
                    <Empty style={{marginTop: '10%'}}/>
                    }


                    {files.map((element, key) => {
                        if (element.fromAddress === element.toAddress) {
                            return (<File key={key} type={"self"} data={element}/>)
                        }
                        else if (element.fromAddress === selfAddress) {
                            return (<File key={key} type={"sent"} data={element}/>)
                        }
                        else if (element.toAddress === selfAddress) {
                            return (<File key={key} type={"received"} data={element}/>)
                        }
                    })}
                </Card>


            </div>
        );
    }
}


export default ViewFile;
