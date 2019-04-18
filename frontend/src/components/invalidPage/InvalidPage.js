import React, { Component } from 'react';

class InvalidPage extends Component {

    render() {


        return (
            <div className="InvalidPage">
                <h1>Not Found</h1>
                <p>The requested URL was not found on the server. If you entered the URL manually please check your spelling and try again.</p>
            </div>
        );
    }
}


export default InvalidPage;
