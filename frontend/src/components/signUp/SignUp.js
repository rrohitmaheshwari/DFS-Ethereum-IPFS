import React, { Component } from 'react';
import {
    Form, Icon, Input, Button, Checkbox, Row, Col, Spin, message
} from 'antd';


class SignUp extends Component {
    state = { loading: false }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({ loading: true });
                console.log('Received values of form: ', values);
                //await api call

                setTimeout(function() {
                    this.setState({ loading: false });
                    message.success('Registered Successfully');
                }.bind(this), 1000);

            }
            else {
                message.error('Please correct the form');
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className="SignUp">
                <Row type="flex" justify="space-around" align="middle" className="fullHeight">
                    <Col span={6} className="boxShadow">
                        <Spin spinning={this.state.loading} delay={500}>
                        <h2 className="alignCenter">Sign Up</h2>
                        <Form onSubmit={this.handleSubmit} className="login-form">

                            <Form.Item>
                                {getFieldDecorator('fname', {
                                    rules: [{required: true, message: 'Please enter your First Name!'}],
                                })(
                                    <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                           placeholder="First Name"/>
                                )}
                            </Form.Item>

                            <Form.Item>
                                {getFieldDecorator('lname', {
                                    rules: [{required: true, message: 'Please enter your Last Name!'}],
                                })(
                                    <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                           placeholder="Last Name"/>
                                )}
                            </Form.Item>

                            <Form.Item>
                                {getFieldDecorator('email', {
                                    rules: [{required: true, message: 'Please enter your email!'}],
                                })(
                                    <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                           placeholder="email"/>
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('password', {
                                    rules: [{required: true, message: 'Please input your Password!'}],
                                })(
                                    <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                           type="password" placeholder="Password"/>
                                )}
                            </Form.Item>
                            <Form.Item className="alignCenter">
                                <Button type="primary" htmlType="submit" className="login-form-button" >
                                    Register
                                </Button>
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
