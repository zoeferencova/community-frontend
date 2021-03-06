import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { PropTypes } from 'prop-types';
import CommUnityContext from "../../contexts/context";
import { ButtonDark, ButtonLight } from "../../components/Utils/Utils";
import styles from "./DeactivationConfirmationPage.module.css";
import UserDataService from "../../services/user-data-service";
import TokenService from "../../services/token-service";

class DeactivationConfirmationPage extends Component {
    static contextType = CommUnityContext;

    state = {
        loading: false
    }

    // Deactivates user by sending delete request to server
    // Clears auth token and logs user out 
    // Pushes location to the deactivation success page
    handleDeactivation = () => {
        this.setState({ loading: true })
        const userId = this.context.user.id;
        UserDataService.deleteUser(userId)
            .then(res => {
                TokenService.clearAuthToken();
                this.setState({ loading: false })
                this.props.setLoggedIn(false);
                this.props.history.push("/deactivated");
            })
    }
    
    render() {
        return ( 
            <div className={styles.main}>
                <h3>Deactivate Account</h3>
                <div className={styles.inner}>
                    <h4>We're sad to see you go <span role="img" aria-label="sad face emoji">😔</span>. Are you sure you want to deactivate your account?</h4>
                    <div className={styles.buttonSection}>
                        <ButtonDark type="button" onClick={() => this.props.history.push("/account")}>Nevermind!</ButtonDark>
                        <ButtonLight className={styles.yesButton} type="submit" onClick={this.handleDeactivation} loading={this.state.loading.toString()}>Yes</ButtonLight>
                    </div> 
                </div> 
            </div>  
        )
    }
}

export default withRouter(DeactivationConfirmationPage);

DeactivationConfirmationPage.propTypes = {
    setLoggedIn: PropTypes.func
}