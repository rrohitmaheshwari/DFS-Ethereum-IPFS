import React, { Component } from 'react';
import {
    Typography, Card, Button
} from 'antd';
import queryString from 'query-string';
import web3 from "../../../web3";
import { history } from "../../../helper/history";
import { message } from "antd/lib/index";

const {Text} = Typography;


class FileDetailed extends Component {

    state = {
        fromAddress: '',
        fromAddressEmail: '',
        toAddress: '',
        toAddressEmail: '',
        hash: '',
        fileName: '',
        timeStamp: '',
        loading: true
    }


    async componentDidMount() {

        this.setState({loading: true});
        let accounts = await web3.eth.getAccounts();

        //user email- get it from REDUX
        let selfEmail = "self.email@gmail.com";

        const {fromAddress, toAddress, hash, fileName, timeStamp} = queryString.parse(window.location.search);
        this.setState({
            fromAddress: fromAddress,
            toAddress: toAddress,
            hash: hash,
            fileName: fileName,
            timeStamp: timeStamp
        })


        //api call to get to or from email address(one is user's)
        if (toAddress === fromAddress && toAddress === accounts[0]) {
            this.setState({fromAddressEmail: selfEmail, toAddressEmail: selfEmail})
        }
        else if (accounts[0] === fromAddress) {
            //call api to get email address for  toAddress
            let toAddressEmail = "toAddressEmailfromAPI";


            this.setState({fromAddressEmail: selfEmail, toAddressEmail: toAddressEmail})
        } else if (accounts[0] === toAddress) {
            //call api to get email address for  toAddress
            let fromAddressEmail = "fromAddressEmailfromAPI";

            this.setState({fromAddressEmail: fromAddressEmail, toAddressEmail: selfEmail})
        }


        //remove time out logic once API is integrated with the backend
        setTimeout(function () {

            this.setState({loading: false});

        }.bind(this), 1000);


    }


    render() {

        return (

            <div className="FileDetailed">


                <Card bordered={false}
                      loading={this.state.loading}
                      title={<div>
                          <Text strong> {this.state.fileName}</Text>
                          <Button className="float-right" type="primary" shape="round" icon="rollback"
                                  size='default' onClick={(event) => {
                              history.goBack();
                          }}>Back</Button>
                      </div>}

                >
                    <Text strong>From:</Text>
                    <Text>{this.state.fromAddressEmail}</Text>
                    <br/>
                    <br/>
                    <Text strong>To:</Text>
                    <Text>{this.state.toAddressEmail}</Text>
                </Card>


            </div>
        );


    }
}


export default FileDetailed;
