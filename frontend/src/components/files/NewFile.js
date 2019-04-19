import React, { Component } from 'react';
import { Upload, Icon, message, Form, Input, Row, Col, Button, Spin, Typography } from 'antd';


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

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({loading: true});
                console.log('Received values of form: ', values);
                //await api call to check for valid email address and return its public key

                //encrypt the file with the public key

                //if file is uploaded and we will get hash in return(or we could upload to ipfs from frontend only

                //call to smart contract with required fields-> fromAddress,toAddress, hash, fileName, timeStamp
                //this will involve two call if sender is not self (update both Addresses account)

                // setTimeout(function () {
                //     this.setState({loading: false});
                //
                // }.bind(this), 1000);
                message.success('Uploaded Successfully');

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
