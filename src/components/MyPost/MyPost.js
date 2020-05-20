import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import styles from "./MyPost.module.css";

export default class MyPost extends Component {
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    render() {
        return (   
            <Link className={styles.link} to={`/my-post/${this.props.id}`}><p className={styles.userPost}>{this.capitalizeFirstLetter(this.props.post_type)} created {moment(this.props.date_created).fromNow()}</p></Link>
        )
    }
}