import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserDataService from "../../services/user-data-service";
import CommUnityContext from "../../contexts/context";
import styles from "../NewPostPage/NewPostPage.module.css";

export default class EditPostPage extends Component {
    static contextType = CommUnityContext;

    state = {
       post: {}
    }

    componentDidMount() {
        const post = this.findPost()
        this.setState({ post })
    }

    findPost() {
        const postId = parseFloat(this.props.match.params.id);
        const post = this.context.user_posts.find(post => post.id === postId)
        return post;
    }

    handleDescriptionChange = e => {
        this.setState({ post: {...this.state.post, description: e.target.value} });
    }

    handleUrgencyChange = e => {
        this.setState({ post: {...this.state.post, urgency: e.target.value} });
    }

    handleTaskChange = e => {
        let opts = [], opt;
    
        for (let i = 0; i < e.target.options.length; i++) {
          opt = e.target.options[i];
    
          if (opt.selected) {
            opts.push(opt.value);
          }
        }
        this.setState({ post: {...this.state.post, categories: opts} });
    }

    handleSubmit = e => {
        e.preventDefault()

        const post_type = this.state.post.post_type;
        let category_ids = [], option;
        for (let i = 0; i < e.target.categories.length; i++) {
          option = e.target.categories[i];
    
          if (option.selected) {
            category_ids.push(i+1);
          }
        }
        
        const post = { post_type, category_ids }

        if (this.state.post.description) {
            post.description = this.state.post.description;
        }

        if (post_type === "request" && this.state.post.urgency) {
            post.urgency = (this.state.post.urgency).toLowerCase();
        }

        UserDataService.patchPost(post, this.state.post.id)
            .then(res => {
                this.context.updatePost(this.state.post)
                this.props.history.push(`/my-post/${this.state.post.id}`)
            })
    }
    
    render() {
        return (   
            <main>
                <h3>Edit {this.state.post.post_type}</h3>
                <form className={styles.form} onSubmit={e => this.handleSubmit(e)}>
                    <div>
                        <label className={styles.label} htmlFor="categories">{this.state.post.post_type === "offer" ? "What can you help with?": "What do you need help with?"}</label>
                        <select value={this.state.post.categories} onChange={this.handleTaskChange} className={styles.select} id="categories" multiple>
                            <option value="Picking up supplies">Picking up supplies</option>
                            <option value="Running errands">Running errands</option>
                            <option value="Phone call">Phone call</option>
                            <option value="Online chat">Online chat</option>
                            <option value="Walking a dog">Walking a dog</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    {this.state.post.post_type === "request" && <div>
                        <label className={styles.label} htmlFor="priority">Urgency</label>
                        <select value={this.state.post.urgency} onChange={this.handleUrgencyChange} className={styles.select} id="priority">
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="Urgent">Urgent</option>
                        </select>
                    </div>}
                    <div>
                        <label className={styles.label} htmlFor="description">Description (optional)</label>
                        <textarea value={this.state.post.description === null ? "" : this.state.post.description} onChange={this.handleDescriptionChange} className={styles.textarea} name="description" id="description"></textarea>
                    </div>
                    <Link to={`/my-post/${this.state.post.id}`}><button>Cancel</button></Link>
                    <button type="submit">Submit</button>
                </form>
            </main>
        )
    }
}