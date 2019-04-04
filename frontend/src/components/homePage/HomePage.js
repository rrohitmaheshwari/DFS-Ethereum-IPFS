import React, { Component } from 'react';
import {
    Layout, Menu, Avatar,Header
} from 'antd';

const {Content, Sider, Footer} = Layout;

class HomePage extends Component {

    state = {
        itemKey: '1'
    };


    handleClick = (e) => {
        console.log('click ', e);
        this.setState({itemKey: e.key});
    }


    render() {
        return (
            <div className="HomePage">
                <Layout style={{minHeight: '100vh'}}>
                    <Layout>
                        <Sider width={200} style={{background: '#fff',  overflow: 'auto', height: '100vh', position: 'fixed', left: 0}}>


                            <div className="alignCenter" style={{paddingTop: '10px'}}>
                                <Avatar shape="square" size={64} icon="user"/>
                            </div>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                onClick={this.handleClick}
                                style={{height: '100%', borderRight: 0, padding: '25px 0px 0px 10px'}}
                            >
                                <Menu.Item key="1">Files</Menu.Item>
                                <Menu.Item key="2">Profile</Menu.Item>
                                <Menu.Item key="3">Analytics</Menu.Item>

                            </Menu>
                        </Sider>
                        <Layout style={{padding: '25px 24px 24px',marginLeft: 200}}>

                            <div style={{
                                background: '#fff', padding: 20, marginBottom: '10px',
                            }}
                            >
                                {this.state.itemKey === '1' ? <h2>Files</h2> : ''}
                                {this.state.itemKey === '2' ? <h2>Profile</h2> : ''}
                                {this.state.itemKey === '3' ? <h2>Analytics</h2> : ''}
                            </div>

                            <Content style={{
                                background: '#fff', padding: 24, margin: 0, minHeight: 280,
                            }}
                            >
                                {this.state.itemKey === '1' ? 'Files' : ''}
                                {this.state.itemKey === '2' ? 'Profile' : ''}
                                {this.state.itemKey === '3' ? 'Analytics' : ''}
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
