import React, { Component } from 'react';
import {
    Row, Col, Statistic, Card, Icon, Form, Input
} from 'antd';
import { message } from "antd/lib/index";
import web3 from "../../web3";
import { connect } from "react-redux";


class Analytic extends Component {

    state = {
        account: '',
        balance: '0',
        selfAddress: '',
    };


    async componentDidMount() {
        let accounts = await web3.eth.getAccounts();
        this.setState({selfAddress: accounts[0]});
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
        let {selfAddress} = this.state;

        const {simpleReducer} = this.props;

        let data = simpleReducer.result;
        let fsent = 0;
        let freceived = 0;
        let fsaved = 0;


        //filer file according to All File, Received Files, Sent Files, My Files
        for (let j = data.length - 1; j >= 0; j--) {
            if (data[j].toAddress !== selfAddress) {
                fsent++;
            }
            else if (data[j].fromAddress !== selfAddress) {
                freceived++
            }
            else if (data[j].fromAddress === data[j].toAddress) {
                fsaved++
            }
        }


        return (
            <div className="Analytic" style={{padding: '30px'}}>

                <Row>
                    <Col span={8}>
                        <Card className="boxShadow" title="Sent Files">
                            <Statistic
                                value={fsent}
                                valueStyle={{color: '#3f8600'}}
                                prefix={<Icon type="arrow-up"/>}
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card className="boxShadow" title="Received Files">
                            <Statistic
                                value={freceived}
                                valueStyle={{color: '#0026ff'}}
                                prefix={<Icon type="arrow-down"/>}
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card className="boxShadow" title="My Files">
                            <Statistic
                                value={fsaved}
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


// export default Analytic;

function mapStateToProps(state) {
    const {simpleReducer} = state;
    return {
        simpleReducer
    };
}

export default connect(mapStateToProps)(Analytic);
