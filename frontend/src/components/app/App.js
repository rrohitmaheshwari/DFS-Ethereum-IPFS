import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
// import { simpleAction } from '../../actions/simpleAction';
import { Router, Route, Switch} from 'react-router-dom';
import SignUp from '../signUp/SignUp'
import HomePage from '../homePage/HomePage'
import LoginPage from '../loginPage/LoginPage'
import InvalidPage from '../invalidPage/InvalidPage'
import { history } from '../../helper/history.js';

class App extends Component {

    state = {
        login: false
    };

    // simpleAction = (event) => {
    //     const {dispatch} = this.props;
    //
    //     dispatch(simpleAction());
    // }

    componentDidMount() {

        //check for login

    }

    render() {
        let user = this.state.login;
        // const {simpleReducer} = this.props;
        return (
            <div className="App">

                {/*<button onClick={this.simpleAction}>Test redux action</button>*/}
                {/*<pre>*/}
                {/*{*/}
                {/*JSON.stringify(simpleReducer)*/}
                {/*}*/}
                {/*</pre>*/}

                <Router history={history}>
                    <Switch>
                    {!user ? <Route exact path="/" component={LoginPage}/> :
                        <Route exact path="/" component={HomePage}/>}
                    {!user ? <Route exact path="/signUp" component={SignUp}/> :
                        <Route exact path="/signUp" component={HomePage}/>}
                    {!user ? <Route exact path="/login" component={LoginPage}/> :
                        <Route exact path="/login" component={HomePage}/>}
                    {!user ? <Route path="/home" component={HomePage}/> :
                        <Route path="/home" component={HomePage}/>}
                        {!user ? <Route path="/file" component={HomePage}/> :
                            <Route path="/file" component={HomePage}/>}

                    <Route path="*" component={InvalidPage}/>
                    </Switch>
                </Router>

            </div>
        );
    }
}


function mapStateToProps(state) {
    const {simpleReducer} = state;
    return {
        simpleReducer
    };
}

export default connect(mapStateToProps)(App);
