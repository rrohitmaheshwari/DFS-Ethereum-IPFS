import React, { Component } from 'react';
import {
    Layout, Menu, Button, Icon
} from 'antd';
import { Form, message } from "antd/lib/index";
import { history } from "../../helper/history";
import { Router, Route } from 'react-router-dom';
import ViewFile from "../files/ViewFile";
import Profile from "../profile/Profile";
import Analytic from "../analytic/Analytic";
import NewFile from "../files/NewFile";
import FileDetailed from "../files/helper/FileDetailed";
import web3 from '../../web3';
import { connect } from "react-redux";
import { simpleAction } from "../../actions/simpleAction";

const SubMenu = Menu.SubMenu;


const {Content, Sider, Footer, Header} = Layout;

class HomePage extends Component {

    state = {
        itemKey: '1',
        collapsed: false,
        selfAddress: '',
        loading: true
    };


    async componentDidMount() {


        let accounts = await web3.eth.getAccounts();
        this.setState({selfAddress: accounts[0], loading: true});
        const {dispatch} = this.props;

        await dispatch(simpleAction());
        this.setState({loading: false});


    }

    onCollapse = (collapsed) => {

        this.setState({collapsed});
    };


    handleClick = (e) => {

        //redirecting to render correct component

        this.setState({itemKey: e.key});
        if (e.key === '1') {
            history.push('/home/allFiles');
        }
        else if (e.key === '2') {
            history.push('/home/receivedFiles');
        }
        else if (e.key === '3') {
            history.push('/home/sentFiles');
        }
        else if (e.key === '4') {
            history.push('/home/myFiles');
        }
        else if (e.key === '5') {
            history.push('/home/profile');
        }
        else if (e.key === '6') {
            history.push('/home/dashboard');
        }
    };

    logoutButton = () => {

        message.success('Logged out Successfully');
        history.push('/Login');

    };

    render() {
        const {simpleReducer} = this.props;

        console.log("simpleReducer");
        console.log(simpleReducer);


        let marginLeft = 200;
        if (this.state.collapsed) {
            marginLeft = 80;
        }

        let selectedKey = 'sub1';

        //logic to render correct selected menu item

        switch (window.location.pathname) {
            case '/home/allFiles':
                selectedKey = '1';
                break;

            case '/home/receivedFiles':
                selectedKey = '2';
                break;

            case '/home/sentFiles':
                selectedKey = '3';
                break;

            case '/home/myFiles':
                selectedKey = '4';
                break;

            case '/home/profile':
                selectedKey = '5';
                break;

            case '/home/dashboard':
                selectedKey = '6';
                break;

            default:
                // history.push('/home/allFiles'); //this will cause pure function render problem in console.
                break;
        }

        return (
            <div className="HomePage">

                <Layout style={{minHeight: '100vh'}}>
                    <Header style={{position: 'fixed', width: '100%', zIndex: 1, background: '#fff'}} theme='light'>

                        {/*<Avatar shape="square" size={64} icon="user"/>*/}
                        <Icon type="gitlab" style={{fontSize: '60px', marginLeft: '17px', color: '#1890ff'}}/>


                        <Button type="primary" icon="poweroff" onClick={this.logoutButton}
                                style={{float: 'right', marginTop: '16px'}}>
                            Logout!
                        </Button>
                    </Header>
                    <Layout>
                        <Sider width={200} style={{
                            background: '#fff',
                            overflow: 'auto',
                            height: '100vh',
                            position: 'fixed',
                            left: 0,
                            top: 64
                        }}
                               collapsible
                               collapsed={this.state.collapsed}
                               onCollapse={this.onCollapse}
                               theme='light'
                        >


                            <Menu
                                onClick={this.handleClick}
                                style={{height: '100%'}}
                                mode="inline"
                                selectedKeys={[selectedKey]}
                                defaultOpenKeys={['sub1']}
                            >
                                <SubMenu key="sub1" title={<span><Icon type="desktop"/><span>Files</span></span>}>

                                    <Menu.Item key="1"><span><Icon type="appstore"/><span>All</span></span></Menu.Item>
                                    <Menu.Item key="2"><span><Icon
                                        type="download"/><span>Received</span></span></Menu.Item>
                                    <Menu.Item key="3"><span><Icon type="upload"/><span>Sent</span></span></Menu.Item>
                                    <Menu.Item key="4"><span><Icon type="save"/><span>My Files</span></span></Menu.Item>

                                </SubMenu>
                                <Menu.Item key="5"><span><Icon type="smile"/><span>Profile</span></span></Menu.Item>
                                <Menu.Item key="6"><span><Icon
                                    type="radar-chart"/><span>Dashboard</span></span></Menu.Item>
                            </Menu>
                        </Sider>
                        <Layout style={{padding: '25px 24px 24px', marginLeft: marginLeft, marginTop: 64}}>
                            <Content style={{
                                background: '#fff', padding: 24, minHeight: 280, margin: '0 16px'
                            }}

                            >

                                <Router history={history}>
                                    <Route exact path="/home/allFiles"
                                           render={(props) => <ViewFile {...props} fileType={"All Files"}
                                                                        data={simpleReducer.result}
                                                                        loading={this.state.loading}
                                                                        selfAddress={this.state.selfAddress}/>}
                                    />
                                    <Route exact path="/home/receivedFiles"
                                           render={(props) => <ViewFile {...props} fileType={"Received Files"}
                                                                        data={simpleReducer.result}
                                                                        loading={this.state.loading}
                                                                        selfAddress={this.state.selfAddress}/>}
                                    />
                                    <Route exact path="/home/sentFiles"
                                           render={(props) => <ViewFile {...props} fileType={"Sent Files"}
                                                                        data={simpleReducer.result}
                                                                        loading={this.state.loading}
                                                                        selfAddress={this.state.selfAddress}/>}
                                    />
                                    <Route exact path="/home/myFiles"
                                           render={(props) => <ViewFile {...props} fileType={"My Files"}
                                                                        data={simpleReducer.result}
                                                                        loading={this.state.loading}
                                                                        selfAddress={this.state.selfAddress}/>}
                                    />

                                    <Route exact path="/home/newFile" component={NewFile}/>
                                    <Route exact path="/home/profile" component={Profile}/>
                                    <Route exact path="/home/dashboard" component={Analytic}/>
                                    <Route path="/file" component={FileDetailed}/>

                                </Router>

                            </Content>
                            <Footer style={{textAlign: 'center'}}>
                                Distributed File System using Blockchain © San Jose State University
                            </Footer>
                        </Layout>
                    </Layout>
                </Layout>
            </div>
        );
    }
}


// export default HomePage;
//
//
function mapStateToProps(state) {
    const {simpleReducer} = state;
    return {
        simpleReducer
    };
}

export default connect(mapStateToProps)(HomePage);
