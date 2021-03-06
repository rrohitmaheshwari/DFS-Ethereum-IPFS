import React, { Component } from 'react';
import {
    Form, Icon, Input, Button, Row, Col, Spin, message
} from 'antd';
import web3 from '../../web3';
import { history } from '../../helper/history.js';
import { RESTService } from "../../api/api.js";
import { simpleAction } from '../../actions/simpleAction';
import { connect } from "react-redux";


class LoginPage extends Component {
    state = {
        loading: false,
        metamask: true,
        account:''
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

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                // this.setState({loading: true});
                console.log('Received values of form: ', values);
                //await api call



                let data={};
                data.email = values.email;
                data.password = values.password;
                data.address= this.state.account;



                try {


                    await RESTService.login(data);


                    message.success('Logged in Successfully');
                    //call action to fetch details
                    const {dispatch} = this.props;
                    await dispatch(simpleAction());

                    history.push('/home/allFiles');
                }
                catch (err) {
                    this.setState({loading: false});
                    message.error('Invalid Credentials!');
                }


            }
            else {
                this.setState({loading: false});
                message.error('Incomplete information');
            }
        });
    }

    render() {


        const {getFieldDecorator} = this.props.form;
        return (
            <div className="Login">
                <Row type="flex" justify="space-around" align="middle" className="fullHeight">
                    <Col span={6} className="boxShadow">
                        <Spin spinning={this.state.loading} delay={500}>
                            <h2 className="alignCenter">Login</h2>
                            <Form onSubmit={this.handleSubmit} className="login-form">

                                <Form.Item label="e-mail" className="marginBottom0">
                                    {getFieldDecorator('email', {
                                        rules: [{required: true, message: 'Please enter your email!'}],
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

                                <Form.Item className="alignCenter" style={{marginBottom: 0, marginTop: 5}}>
                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                        Login
                                    </Button>
                                </Form.Item>

                                <Form.Item className="alignCenter" style={{lineHeight: 0}}>
                                    or <a href="/signUp">Register now!</a>
                                </Form.Item>
                            </Form>
                        </Spin>
                    </Col>
                </Row>
            </div>
        );
    }
}


// export default Form.create()(LoginPage);



function mapStateToProps(state) {
    const {simpleReducer} = state;
    return {
        simpleReducer
    };
}

export default connect(mapStateToProps)(Form.create()(LoginPage));