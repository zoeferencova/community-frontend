import React, { Component } from "react";
import { Link } from "react-router-dom";
import Task from "../Task/Task";
import UserDataService from "../../services/user-data-service";
import styles from "./Post.module.css";

export default class Post extends Component {
    render() {
        return (   
            <div className={styles.post}>
                <div className={styles.details}>
                    <div>
                        <h4>{this.props.first_name} {this.props.type === "offer" ? "offered to help" : "requested help"}</h4>
                        {this.props.type === "request" && <span className={styles.urgency}>{this.props.urgency} urgency</span>}
                        <ul className={styles.helpItems}>
                            {this.props.categories.map(task => <Task key={task} task={task} />)}
                        </ul>
                        <p>{this.props.description}</p>
                    </div>
                    <div>
                        <span>{UserDataService.metersToMiles(this.props.distance_from_user) + " mi"}</span>
                    </div>
                </div>
                <Link className={styles.buttonLink} to={`/post/${this.props.id}`}><button className={styles.button}>{this.props.type === "offer" ? "Accept offer" : "Offer to help"}</button></Link>
            </div>        
        )
    }
}




