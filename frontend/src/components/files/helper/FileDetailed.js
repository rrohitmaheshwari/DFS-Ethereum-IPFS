import React, { Component } from 'react';
import {
    Typography, Card, Button, Form, Icon, Input, Row, Col, Spin, message
} from 'antd';
import queryString from 'query-string';
import web3 from "../../../web3";
import { history } from "../../../helper/history";
import EthCrypto from 'eth-crypto';


const {Text} = Typography;


const cardSent = {
    fontSize: 150,
    color: 'rgb(24, 144, 255)',
    padding: '10%',
    margin: '10%',
    textShadow: '2px 2px 4px #908e87',
};


const gridStyleReceived = {
    boxShadow: '0 2px 8px rgba(76, 173, 129, 0.35)',
};

const cardReceived = {
    fontSize: 150,
    color: 'rgb(76, 173, 129)',
    padding: '10%',
    margin: '10%',
    textShadow: '2px 2px 4px #908e87',
};


const gridStyleSelf = {
    boxShadow: '0 2px 8px rgba(250, 203, 20, 0.45)',
};


const cardSelf = {
    fontSize: 150,
    color: 'rgb(250, 203, 20)',
    padding: '10%',
    margin: '10%',
    textShadow: '2px 2px 4px #908e87',
};

class FileDetailed extends Component {

    state = {
        fromAddress: '',
        fromAddressEmail: '',
        toAddress: '',
        toAddressEmail: '',
        hash: '',
        fileName: '',
        timeStamp: '',
        loading: true,
        type: '',
        account: '',
    }


    async componentDidMount() {

        this.setState({loading: true});
        let accounts = await web3.eth.getAccounts();
        this.state.account = accounts[0];


        //user email- get it from REDUX
        let selfEmail = "self.email@gmail.com";

        const {fromAddress, toAddress, hash, fileName, timeStamp, type} = queryString.parse(window.location.search);
        this.setState({
            fromAddress: fromAddress,
            toAddress: toAddress,
            hash: hash,
            fileName: fileName,
            timeStamp: timeStamp,
            type: type
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


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({loading: true});
                console.log('Received values of form: ', values);
                //await api call to get the file and the decrypt it using Private Key( values.PrivateKey )




                setTimeout(function () {
                    message.success('File Downloaded');
                    this.setState({loading: false});
                }.bind(this), 1000);
            }
            else {
                this.setState({loading: false});
                message.error('Incomplete information');
            }
        });
    }

    validatePrivateKey = (rule, value, callback) => {
        const form = this.props.form;


        const privateKey = form.getFieldValue('PrivateKey');
        console.log(privateKey);
        let showAddress = this.state.account;

        let publicKey;
        let address;
        let validAddress = "";
        try {

            publicKey = EthCrypto.publicKeyByPrivateKey(
                privateKey
            );


            address = EthCrypto.publicKey.toAddress(
                publicKey
            );

        }
        catch (err) {
            callback('Enter Valid Private Key!');
        }


        if (this.state.account === address) {
            callback();
        }

        if (!this.state.metamask && address && address.length !== 0) {
            callback();
        }
    }

    render() {
        const {getFieldDecorator} = this.props.form;

        let cardStyle = {};
        let icon = "";

        if (this.state.type === "sent") {
            cardStyle = cardSent;
            icon = "fas fa-file-upload";
        } else if (this.state.type === "received") {
            cardStyle = cardReceived;
            icon = "fas fa-file-download";
        } else {
            cardStyle = cardSelf;
            icon = "fas fa-file-archive";
        }


        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 6,
                },
            },
        };

        let isDownloadable = false;

        if (this.state.type === "received" || this.state.type === "self") {
            isDownloadable = true;
        }
        const privateKey = this.props.form.getFieldValue('PrivateKey');
        let showAddress = this.state.account;

        let publicKey;
        let address;
        let validAddress = "";
        try {

            publicKey = EthCrypto.publicKeyByPrivateKey(
                privateKey
            );

            address = EthCrypto.publicKey.toAddress(
                publicKey
            );

            console.log('publicKey');
            console.log(publicKey);

        }
        catch (err) {
//intial rendering errors & invalid private key error(while typing)
        }


        if (privateKey && privateKey.length !== 0) {
            validAddress = "error";
        }
        if (this.state.account === address) {
            validAddress = "success";
        }

        if (!this.state.metamask && address && address.length !== 0) {
            showAddress = address;
            validAddress = "success";
        }


        return (

            <div className="FileDetailed">


                <Card bordered={false}
                      loading={this.state.loading}
                      title={<div>
                          <Text strong> File Details</Text>
                          <Button className="float-right" type="primary" shape="round" icon="rollback"
                                  size='default' onClick={(event) => {
                              history.goBack();
                          }}>Back</Button>
                      </div>}

                >
                    <Row className="fullHeight">
                        <Col span={14}>
                            <Form {...formItemLayout} onSubmit={this.handleSubmit} className="login-form">

                                <Form.Item label="From">
                                    {getFieldDecorator('from', {
                                        rules: [],
                                        initialValue: this.state.fromAddressEmail,
                                    })(
                                        <Input prefix={<Icon type="global" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                               placeholder="Sender's Email" disabled={true}/>
                                    )}
                                </Form.Item>

                                <Form.Item label="To">
                                    {getFieldDecorator('to', {
                                        rules: [],
                                        initialValue: this.state.toAddressEmail,
                                    })(
                                        <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                               placeholder="Receiver's Email" disabled={true}/>
                                    )}
                                </Form.Item>

                                <Form.Item label="File Name">
                                    {getFieldDecorator('fname', {
                                        rules: [],
                                        initialValue: this.state.fileName,
                                    })(
                                        <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                               placeholder="File Name" disabled={true}/>
                                    )}
                                </Form.Item>

                                <Form.Item label="Time Stamp">
                                    {getFieldDecorator('ftime', {
                                        rules: [],
                                        initialValue: this.state.timeStamp,
                                    })(
                                        <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                               placeholder="Time Stamp" disabled={true}/>
                                    )}
                                </Form.Item>
                                {isDownloadable &&

                                <Form.Item label="Private Key" hasFeedback validateStatus={validAddress}>
                                    {getFieldDecorator('PrivateKey', {
                                        rules: [{validator: this.validatePrivateKey,}],
                                    })(
                                        <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                               placeholder="Private Key"/>
                                    )}
                                </Form.Item>
                                }
                                {isDownloadable &&
                                < Form.Item className="alignCenter">
                                    <Button type="primary" htmlType="submit" className="login-form-button"
                                            style={{marginLeft: '80%'}}>
                                        Download
                                    </Button>
                                </Form.Item>

                                }

                            </Form>
                        </Col>
                        <Col span={10}>
                            <i className={icon} style={cardStyle}></i>
                        </Col>
                    </Row>
                </Card>
            </div>
        );


    }
}


export default Form.create()(FileDetailed);
