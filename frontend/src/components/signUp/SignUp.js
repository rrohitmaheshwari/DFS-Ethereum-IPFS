import React, { Component } from 'react';
import {
    Form, Icon, Input, Button, Row, Col, Spin, message, Avatar
} from 'antd';
import web3 from '../../web3';
import EthCrypto from 'eth-crypto';
import InboxFactoryABI from '../../helper/build/InboxFactory.json';

import { RESTService } from "../../api/api.js";
import { history } from "../../helper/history";


class SignUp extends Component {
    state = {
        loading: false,
        account: '',
        metamask: true
    };


    async componentDidMount() {
        let accounts = await web3.eth.getAccounts();
        if (accounts.length === 0) {
            message.error('Unable to access Metamask');
            this.setState({metamask: false})
        }
        else {
            this.setState({account: accounts[0]})
        }


    }

    handleSubmit = async (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {

                try {


                    console.log('Received values of form: ', values);
                    this.setState({loading: true});

                    //to be fetched from config file or from the server
                    // const inboxFactoryAddress = '0xFa5cfcaA2eF44eF0cF77A9C9c3fa5673c59cFDa6';

                    let inboxFactoryAddress = await RESTService.fetchInboxAddress();
                    inboxFactoryAddress = inboxFactoryAddress.data.msg;
                    // console.log("iFA:" + iFA);
                    console.log("inboxFactoryAddress");
                    console.log(inboxFactoryAddress);


                    let account = await web3.eth.getAccounts();
                    //check if email id has already been registered

                    let data = {};
                    data.email = values.email;
                    data.publicKey = values.publicKey;
                    console.log("before checkUserExists");
                    let checkUserExists;
                    try {
                        checkUserExists = await RESTService.checkUserExists(data);
                    }
                    catch (err) {

                        if (err.status === 403) {
                            this.setState({loading: false});
                            message.error('User already exists');
                            return;
                        }
                    }


                    console.log('account:' + account[0]);
                    //create entry in the blockchain Inbox Factory
                    let instanceInboxFactory = new web3.eth.Contract(
                        JSON.parse(InboxFactoryABI.interface),
                        inboxFactoryAddress
                    );

                    console.log('Creating instanceInboxFactory:' + instanceInboxFactory);

                    await instanceInboxFactory.methods.createInbox().send({from: account[0]});

                    console.log('Created instanceInboxFactory');

                    //get back the deployed Inbox address

                    let inboxAddress = await instanceInboxFactory.methods.getDeployedInbox().call({from: account[0]});


                    //create new user by sending all information to the server( Do Not Send the Private Key)
                    console.log('Created inboxAddress:' + inboxAddress);


                    let registerUser = {
                        firstName: values.fname,
                        lastName: values.lname,
                        email: values.email,
                        password: values.password,
                        publicKey: values.publicKey,
                        address: inboxAddress
                    };


                    await RESTService.register(registerUser);


                    message.success('Registered Successfully');

                    history.push('/login');


                    this.setState({loading: false});
                    //redirect to login
                } catch (err) {
                    this.setState({loading: false});
                    message.error('Error');
                }
            }
            else {
                this.setState({loading: false});
                message.error('Please correct the form');
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
            console.log("valid1");
            callback();
        }

        if (!this.state.metamask && address && address.length !== 0) {
            console.log("valid2");
            callback();
        }

    }


    render() {

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

        const {getFieldDecorator} = this.props.form;
        return (
            <div className="SignUp">
                <Row type="flex" justify="space-around" align="middle" className="fullHeight">
                    <Col span={6} className="boxShadow">
                        <Spin spinning={this.state.loading} delay={500}>

                            <h2 className="alignCenter">Sign Up</h2>

                            <div style={{textAlign: 'center'}}>
                                <Avatar size={64} style={{backgroundColor: '#537895'}} icon="user"/>
                            </div>

                            <Form onSubmit={this.handleSubmit} className="login-form">

                                <Form.Item label="First Name" className="marginBottom0">
                                    {getFieldDecorator('fname', {
                                        rules: [{required: true, message: 'Please enter your First Name!'}],
                                    })(
                                        <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                               placeholder="First Name"/>
                                    )}
                                </Form.Item>

                                <Form.Item label="Last Name" className="marginBottom0">
                                    {getFieldDecorator('lname', {
                                        rules: [{required: true, message: 'Please enter your Last Name!'}],
                                    })(
                                        <Input prefix={<Icon type="contacts" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                               placeholder="Last Name"/>
                                    )}
                                </Form.Item>

                                <Form.Item label="e-mail" className="marginBottom0">
                                    {getFieldDecorator('email', {
                                        rules: [{
                                            type: 'email', message: 'The input is not valid E-mail!',
                                        }, {required: true, message: 'Please enter your email!'}],
                                    })(
                                        <Input prefix={<Icon type="global" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                               placeholder="email"/>
                                    )}
                                </Form.Item>

                                <Form.Item label="password" className="marginBottom0">
                                    {getFieldDecorator('password', {
                                        rules: [{required: true, message: 'Please input your Password!'}],
                                    })(
                                        <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                               type="password" placeholder="Password"/>
                                    )}
                                </Form.Item>

                                <Form.Item label="Private Key" className="marginBottom0">
                                    {getFieldDecorator('PrivateKey', {
                                        rules: [{
                                            validator: this.validatePrivateKey,
                                        }],
                                    })(
                                        <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                               type="password" placeholder="PrivateKey"/>
                                    )}
                                </Form.Item>


                                <Form.Item label="Public Key" className="marginBottom0">

                                    {getFieldDecorator('publicKey', {
                                        rules: [{}],
                                        initialValue: publicKey,
                                    })(
                                        <Input
                                            prefix={<Icon type="property-safety" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                            type="account" placeholder="Public Key"
                                            disabled={true}
                                        />
                                    )}
                                </Form.Item>

                                <Form.Item label="Address"
                                           hasFeedback validateStatus={validAddress}

                                           help={validAddress === "error" ? "Mismatch Keys" : ""}

                                           className="marginBottom0">

                                    {getFieldDecorator('Address', {
                                        rules: [],
                                        initialValue: showAddress,
                                    })(
                                        <Input
                                            prefix={<Icon type="property-safety" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                            type="barcode" placeholder="No account selected"
                                            disabled={true}/>
                                    )}


                                </Form.Item>

                                <Form.Item className="alignCenter">
                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                        Register
                                    </Button>
                                </Form.Item>

                                <Form.Item className="alignCenter">
                                    or <a href="/Login">Sign In</a>
                                </Form.Item>
                            </Form>
                        </Spin>
                    </Col>
                </Row>


            </div>
        );
    }
}


export default Form.create()(SignUp);
