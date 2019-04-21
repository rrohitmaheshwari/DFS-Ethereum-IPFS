import React, { Component } from 'react';
import { Upload, Icon, message, Form, Input, Row, Col, Button, Spin, Typography } from 'antd';
import web3 from '../../web3';
import InboxFactoryABI from '../../helper/build/InboxFactory.json';
import InboxABI from '../../helper/build/Inbox.json';

const Dragger = Upload.Dragger;
const {Text} = Typography;

function formatBytes(bytes) {
    if (bytes < 1024) return bytes + " Bytes";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(3) + " KB";
    else if (bytes < 1073741824) return (bytes / 1048576).toFixed(3) + " MB";
    else return (bytes / 1073741824).toFixed(3) + " GB";
};

class NewFile extends Component {

    state = {
        file: {},
        fileName: '',
        fileSize: '',
        showDetails: false,
        loading: false,
    }

    customRequestUploader = (file) => {

        console.log("ok")
        console.log(file);
        console.log(file.file);
        message.success(`${file.file.name} file uploaded successfully.`);
        this.setState({
            fileName: file.file.name,
            fileSize: file.file.size,
            showDetails: true,
            file: file
        });

    }


    handleSubmit = async (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                this.setState({loading: true});

                try {


                    //to be fetched from config file or from the server
                    const inboxFactoryAddress = '0xFa5cfcaA2eF44eF0cF77A9C9c3fa5673c59cFDa6';

                    let account = await web3.eth.getAccounts();

                    console.log('accounts : ' + account[0]);

                    //*******await api call to check for valid email address and return its public key

                    //*******encrypt the file with the public key

                    //*******if file is uploaded and we will get hash in return(or we could upload to ipfs from frontend only

                    //*******call to smart contract with required fields-> fromAddress,toAddress, hash, fileName, timeStamp
                    //*******this will involve two call if sender is not self (update both Addresses account)


                    console.log('Generating instanceInboxFactory');

                    let instanceInboxFactory = new web3.eth.Contract(
                        JSON.parse(InboxFactoryABI.interface),
                        inboxFactoryAddress
                    );


                    let date = new Date();
                    let processedDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();


                    //Receiver's address to be fetched from serve by email id
                    let receiverAddress = '0x3552CE099Da8e41BFA5F813dFF0226bF8855de0B'

                    let obj = {}
                    obj.fromAddress = account[0];
                    obj.toAddress = receiverAddress;     //account that we get from the server by sending the email id
                    obj.hash = "Hash that we get from sending to IPFS";
                    obj.fileName = this.state.fileName;
                    obj.timeStamp = processedDate;


                    console.log('Getting inboxAddress');

                    let inboxAddress = await instanceInboxFactory.methods.getDeployedInbox().call({from: account[0]});

                    let rInboxAddress;

                    if (account[0] !== receiverAddress) {
                        rInboxAddress = await instanceInboxFactory.methods.getDeployedInbox().call({from: receiverAddress});
                    }

                    console.log('inboxAddress' + inboxAddress);
                    console.log('inboxAddress' + rInboxAddress);
                    console.log('Generating instanceInbox');

                    let instanceInbox = new web3.eth.Contract(
                        JSON.parse(InboxABI.interface),
                        inboxAddress
                    );

                    let rinstanceInbox;

                    if (account[0] !== receiverAddress) {
                        rinstanceInbox = new web3.eth.Contract(
                            JSON.parse(InboxABI.interface),
                            rInboxAddress
                        );
                    }

                    console.log('call to insertMessage');

                    //address fromAddress, address toAddress, string hash, string fileName, string timeStamp

                    if (account[0] === receiverAddress) {
                        await instanceInbox.methods.insertMessage(obj.fromAddress, obj.toAddress, obj.hash, obj.fileName, obj.timeStamp).send({from: account[0]});
                        console.log('call to self succeeded');
                    }
                    else {


                        let insert_message = async function () {
                            return await Promise.all([instanceInbox.methods.insertMessage(obj.fromAddress, obj.toAddress, obj.hash, obj.fileName, obj.timeStamp).send({from: account[0]})
                                , rinstanceInbox.methods.insertMessage(obj.toAddress, obj.fromAddress, obj.hash, obj.fileName, obj.timeStamp).send({from: account[0]})]);

                        }
                        let result = await insert_message();

                        console.log('call to two accounts successful');
                    }


                    this.setState({loading: false});
                    message.success('Uploaded Successfully');
                } catch (err) {
                    this.setState({loading: false});
                    message.error('Message not sent!');
                }


            }
            else {
                message.error('Please correct the form');
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;


        const props = {
            multiple: false,
            showUploadList: false,
            customRequest: this.customRequestUploader,
        };


        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 6},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };

        return (
            <div className="NewFile">
                <Spin spinning={this.state.loading} delay={500}>

                    <Row type="flex" justify="space-around" align="middle" className="fullHeight">
                        <Col span={12}>
                            <div style={{marginBottom: 10}}>
                                <Dragger {...props} >
                                    <p className="ant-upload-drag-icon">
                                        <Icon type="inbox"/>
                                    </p>
                                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                    <p className="ant-upload-hint">Support for a single upload.</p>
                                </Dragger>
                            </div>

                            <Form {...formItemLayout} onSubmit={this.handleSubmit} className="login-form">

                                {this.state.showDetails &&
                                <div>


                                    <Form.Item label="File Name:">
                                        <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                               disabled={true}
                                               value={this.state.fileName}
                                        />
                                    </Form.Item>

                                    <Form.Item label="File Size:">
                                        <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                               disabled={true}
                                               value={this.state.fileSize}
                                        />
                                    </Form.Item>

                                    <Form.Item label="Receiver Email:">
                                        {getFieldDecorator('email', {
                                            rules: [{required: true, message: 'Please enter Receiver\'s email!'}],
                                        })(
                                            <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                   placeholder="Receiver email"/>
                                        )}
                                    </Form.Item>

                                    <Form.Item style={{marginLeft: '43%'}}>
                                        <Button className="alignCenter" type="primary" htmlType="submit">
                                            Upload & Send
                                        </Button>
                                    </Form.Item>

                                </div>
                                }

                            </Form>
                        </Col>
                    </Row>

                </Spin>
            </div>


        );
    }
}


export default Form.create()(NewFile);
