import React, { Component } from 'react';
import {
    Layout, Menu, Avatar, Button , Icon
} from 'antd';
import { message } from "antd/lib/index";
import { history } from "../../helper/history";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const {Content, Sider, Footer , Header} = Layout;

class HomePage extends Component {

    state = {
        itemKey: '1'
    };


    handleClick = (e) => {
        console.log('click ', e);
        this.setState({itemKey: e.key});
    }

    logoutButton = () => {

        message.success('Logged out Successfully');
        history.push('/Login');

    }


    render() {
        return (
            <div className="HomePage">

                <Layout style={{minHeight: '100vh'}}>
                    <Header style={{ background: '#fff'}} theme='light'>

                            {/*<Avatar shape="square" size={64} icon="user"/>*/}
                                <Icon type="gitlab" style={{fontSize: '60px',marginLeft:'17px'}}/>



                        <Button type="primary" icon="poweroff" onClick={this.logoutButton} style={{float:'right',marginTop: '16px'}}>
                            Logout!
                        </Button>
                    </Header>
                    <Layout>
                        <Sider width={200} style={{background: '#fff',  overflow: 'auto', height: '100vh', position: 'fixed', left: 0}}>




                            <Menu
                                onClick={this.handleClick}
                                style={{height: '100%', borderRight: 0, padding: '0px 0px 0px 10px'}}
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                            >
                                <SubMenu key="sub1" title={<span><Icon type="desktop" /><span>Files</span></span>}>

                                        <Menu.Item key="1"><span><Icon type="appstore" /><span>All</span></span></Menu.Item>
                                        <Menu.Item key="2"><span><Icon type="download" /><span>Received</span></span></Menu.Item>
                                        <Menu.Item key="3"><span><Icon type="upload" /><span>Sent</span></span></Menu.Item>

                                </SubMenu>
                                <Menu.Item key="4"><span><Icon type="smile" /><span>Profile</span></span></Menu.Item>
                                <Menu.Item key="5"><span><Icon type="radar-chart" /><span>Analytics</span></span></Menu.Item>
                            </Menu>
                        </Sider>
                        <Layout style={{padding: '25px 24px 24px',marginLeft: 200}}>



                            <Content style={{
                                background: '#fff', padding: 24, minHeight: 280,
                            }}
                            >
                                {this.state.itemKey === '1' ? 'All Files' : ''}
                                {this.state.itemKey === '2' ? 'Received Files' : ''}
                                {this.state.itemKey === '3' ? 'Sent Files' : ''}
                                {this.state.itemKey === '4' ? 'Profile' : ''}
                                {this.state.itemKey === '5' ? 'Analytics' : ''}
                            </Content>
                            <Footer style={{ textAlign: 'center' }}>
                                Distributed File System using Blockchain © San Jose State University
                            </Footer>
                        </Layout>
                    </Layout>
                </Layout>
            </div>
        );
    }
}


export default HomePage;
