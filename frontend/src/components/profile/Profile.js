import React, { Component } from 'react';
import {
    Icon, Form, Input, Row, Col, Spin, message, Card, Typography
} from 'antd';
import { RESTService } from "../../api/api.js";
import { history } from "../../helper/history";

const {TextArea} = Input;
const {Text} = Typography;


class Profile extends Component {


    state = {
        fname: '',
        lname: '',
        email: '',
        publicKey: '',
        loading: true,
    };


    async componentDidMount() {
        try {


            let profileData = await RESTService.getProfile();

            this.setState({
                fname: profileData.data.firstName,
                lname: profileData.data.lastName,
                email: profileData.data.email,
                publicKey: profileData.data.publicKey,
                loading: false,
            })
        }
        catch (err) {
            this.setState({
                loading: false,
            })
            message.error("Cannot fetch Profile Info");
        }

    }


    render() {
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

        let {
            fname,
            lname,
            email,
            publicKey
        } = this.state;
        return (
            <div className="Profile">

                <div>
                    <Spin spinning={this.state.loading} delay={500}>

                        <Card bordered={false}
                              title={<div>
                                  <Text strong> Profile </Text>
                              </div>}

                        >

                            <Row type="flex" justify="space-around" align="middle" className="fullHeight">
                                <Col span={16}>
                                    <Form {...formItemLayout} onSubmit={this.handleSubmit} className="login-form">

                                        <Form.Item label="First Name">
                                            <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                   placeholder="First Name"
                                                   value={fname}
                                                   disabled={true}/>
                                        </Form.Item>

                                        <Form.Item label="Last Name">
                                            <Input prefix={<Icon type="contacts" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                   placeholder="Last Name"
                                                   value={lname}
                                                   disabled={true}/>
                                        </Form.Item>

                                        <Form.Item label="Email">
                                            <Input prefix={<Icon type="global" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                   placeholder="Email"
                                                   value={email}
                                                   disabled={true}/>
                                        </Form.Item>

                                        <Form.Item label="Public Key">
                                    <TextArea
                                        placeholder="Public Key"
                                        value={publicKey}
                                        autosize={{minRows: 3}}
                                        disabled={true}/>
                                        </Form.Item>


                                    </Form>

                                </Col>
                            </Row>
                        </Card>
                    </Spin>
                </div>
            </div>
        );
    }
}


export default Profile;
