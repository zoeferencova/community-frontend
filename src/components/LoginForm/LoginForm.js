import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { PropTypes } from 'prop-types';
import { ButtonLight, ButtonDark, Input, Label, Error } from "../Utils/Utils";
import AuthApiService from "../../services/auth-api-service";

import styles from "./LoginForm.module.css";

class LoginForm extends Component {
    state = { 
        error: null,
        loading: false
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({...this.state, loading: true })

        const { email, password } = e.target;

        AuthApiService.postLogin({
            email: email.value,
            password: password.value,
        })
            .then(user => {
                email.value = "";
                password.value = "";
                this.setState({...this.state, loading: false })
                this.props.setLoggedIn(true)
                !user.location ? this.props.history.push("/location") : this.props.history.push("/home");
            })
            .catch(res => {
                this.setState({ loading: false, error: res.error })
            })
    }
    
    render() {
        return (
            <form onSubmit={e => this.handleSubmit(e)} className={styles.form}>
                {this.state.error && <Error message={this.state.error} />}                
                <Label htmlFor="email">Email</Label>
                <Input required type="text" name="email" id="email" />
                <Label htmlFor="password">Password</Label>
                <Input required type="password" name="password" id="password" />
                <div className={styles.buttonContainer}>
                    <ButtonLight type="button" onClick={() => this.props.history.push("/")}>Cancel</ButtonLight>
                    <ButtonDark type="submit" loading={this.state.loading.toString()}>Sign in</ButtonDark>
                </div>
                
            </form>
        )
    }
}

export default withRouter(LoginForm)

LoginForm.propTypes = {
    setLoggedIn: PropTypes.func
}