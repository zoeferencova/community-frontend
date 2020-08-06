import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { ButtonLight, ButtonDark, Input, Label } from "../Utils/Utils";
import AuthApiService from "../../services/auth-api-service";

import styles from "./LoginForm.module.css";

class LoginForm extends Component {
    state = { error: null }

    handleSubmit(e) {
        e.preventDefault();

        const { email, password } = e.target;

        AuthApiService.postLogin({
            email: email.value,
            password: password.value,
        })
            .then(user => {
                email.value = "";
                password.value = "";
                !user.location ? this.props.history.push("/location") : this.props.history.push("/home");
            })
            .then(res => this.props.setLoggedIn(true))
            .catch(res => {
                this.setState({ error: res.error })
            })
    }
    
    render() {
        return (
            <form onSubmit={e => this.handleSubmit(e)} className={styles.form}>
                {this.state.error && 
                <div role="alert">
                    <p>{this.state.error}</p>
                </div>}                
                <Label htmlFor="email">Email</Label>
                <Input required type="text" name="email" id="email" />
                <Label htmlFor="password">Password</Label>
                <Input required type="password" name="password" id="password" />
                <div className={styles.buttonContainer}>
                    <ButtonLight type="button" onClick={() => this.props.history.push("/")}>Cancel</ButtonLight>
                    <ButtonDark type="submit">Sign in</ButtonDark>
                </div>
                
            </form>
        )
    }
}

export default withRouter(LoginForm)