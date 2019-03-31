import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { simpleAction } from '../../actions/simpleAction';

class App extends Component {

    simpleAction = (event) => {
        const { dispatch } = this.props;
        
        dispatch(simpleAction());
    }

    render() {
        const { simpleReducer } = this.props;
        return (
            <div className="App">
                Frontend

                <button onClick={this.simpleAction}>Test redux action</button>
                <pre>
                 {
                     JSON.stringify(simpleReducer)
                 }
                </pre>
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
