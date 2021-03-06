import React, { Component } from "react";
import { PropTypes } from 'prop-types';
import MessageLayout from "../../components/MessageLayout/MessageLayout";

export default class MessagePage extends Component { 
    render() {
        return(
            <MessageLayout title="Chat App" user={this.props.user} />
        )
    }
}

MessagePage.propTypes = {
    user: PropTypes.object
}