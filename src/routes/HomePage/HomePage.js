import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ButtonLight, ButtonDark } from "../../components/Utils/Utils";
import MyPost from "../../components/MyPost/MyPost";
import Post from "../../components/Post/Post";
import GoogleMap from "../../components/GoogleMap/GoogleMap";
import CommUnityContext from "../../contexts/context";
import styles from "./HomePage.module.css";

export default class HomePage extends Component {
    static contextType = CommUnityContext;

    state = {
        showPosts: false,
        showLocation: false,
    }

    makeUserPosts() {
        return this.context.user_posts.map(post => <MyPost key={post.id} id={post.id} post_type={post.post_type} date_created={post.date_created} />)
    }

    makeAllPosts() {
        return this.context.neighborhood_posts.map(post => <Post key={post.id} id={post.id} post_type={post.post_type} first_name={post.first_name} categories={post.categories} description={post.description} urgency={post.urgency} date_created={post.date_created} location={post.location} distance_from_user={post.distance_from_user} />)
    }

    goToNewPost = type => {
        this.props.history.push(`/new-post/${type}`)
    }
    
    render() {
        return (   
            <main className={styles.main}>
                {!this.props.loading && <>
                <header className={styles.header}>
                    <div className={styles.userInfo}>
                        <h2>Welcome, {this.context.user.first_name}!</h2>
                        <div className={styles.newPostButtons}>
                            <ButtonLight className={styles.requestButton} onClick={() => this.goToNewPost("request")}><i className={`fas fa-hand-paper ${styles.hand}`}></i> Request</ButtonLight>
                            <ButtonLight className={styles.newPostButton} onClick={() => this.goToNewPost("offer")}><i className={`fas fa-heart ${styles.heart}`}></i> Offer</ButtonLight>
                        </div>
                        <div className={styles.yourPosts}>
                            <div className={styles.infoTitle} onClick={() => this.state.showPosts ? this.setState({ showPosts: false }) : this.setState({ showPosts: true })}>
                                <h3>Your Posts</h3>
                                <p className={`${styles.plus} ${!this.state.showPosts && styles.unrotate} ${this.state.showPosts && styles.rotate}`}>+</p>
                            </div>
                            <div className={`${styles.infoBody} ${!this.state.showPosts && styles.hide}`}>
                                {this.context.user_posts.length ? this.makeUserPosts() : "You do not have any posts"}
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.mapSection}`}>
                        <div className={styles.infoTitle} onClick={() => this.state.showLocation ? this.setState({ showLocation: false }) : this.setState({ showLocation: true })}>
                            <h3 className={styles.mapTitle}>Your Location</h3>
                            <p className={`${styles.plus} ${!this.state.showLocation && styles.unrotate} ${this.state.showLocation && styles.rotate}`}>+</p>
                        </div>
                        <div className={`${styles.infoBody} ${styles.infoBodyMap} ${!this.state.showLocation && styles.hide}`}>
                            <GoogleMap className={styles.map} radius={this.context.user.radius} location={this.context.user.location} displayMarker={true} />
                            <p className={styles.mapSubtitle}>Results are being shown for this area. <Link to="/location" className={styles.mapSubLink}>Change location?</Link></p>
                        </div>
                    </div>
                </header>
                <section className={styles.feed}>
                    <div className={styles.feedHeader}>
                        <h3>There are {this.context.neighborhood_posts.length} posts in your area</h3>
                    </div> 
                    {this.context.user.location ? this.makeAllPosts() : "Please save your current location to view posts in your area"}
                </section>
                </>}
            </main>
        )
    }
}