import React, { Component } from 'react';
import {
    Row, Col, Statistic, Card, Icon, Form, Input
} from 'antd';
import { message } from "antd/lib/index";
import web3 from "../../web3";


class Analytic extends Component {

    state = {
        account: '',
        balance: '0',
    };


    async componentDidMount() {
        let accounts = await web3.eth.getAccounts();
        let balance = await web3.utils.fromWei(await web3.eth.getBalance(accounts[0]), 'ether') + ' ETH';
        if (accounts.length === 0) {
            message.error('Unable to access Metamask');
        }
        else {
            this.setState({account: accounts[0]})
            this.setState({balance: balance})
        }


    }

    render() {
        let account = this.state.account;
        let balance = this.state.balance;


        return (
            <div className="Analytic" style={{padding: '30px'}}>

                <Row>
                    <Col span={8}>
                        <Card className="boxShadow" title="Files Sent">
                            <Statistic
                                value={11}
                                valueStyle={{color: '#3f8600'}}
                                prefix={<Icon type="arrow-up"/>}
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card className="boxShadow" title="Files Received">
                            <Statistic
                                value={9}
                                valueStyle={{color: '#0026ff'}}
                                prefix={<Icon type="arrow-down"/>}
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card className="boxShadow" title="Files Saved">
                            <Statistic
                                value={9}
                                valueStyle={{color: '#ff9027'}}
                                prefix={<Icon type="save"/>}
                            />
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Card className="boxShadow" title="Ethereum Details">
                            <Form className="login-form">

                                <Form.Item label="Account Number:">
                                    <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                           disabled={true}
                                           value={account}
                                    />
                                </Form.Item>

                                <Form.Item label="Account Balance:">
                                    <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                           disabled={true}
                                           value={balance}
                                    />
                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
            ;
    }
}


export default Analytic;
