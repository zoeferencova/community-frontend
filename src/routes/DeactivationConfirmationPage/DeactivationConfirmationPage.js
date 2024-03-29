import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PropTypes } from 'prop-types';
import CommUnityContext from "../../contexts/context";
import { ButtonDark, ButtonLight, Container } from "../../components/Utils/Utils";
import styles from "./DeactivationConfirmationPage.module.css";
import UserDataService from "../../services/user-data-service";
import TokenService from "../../services/token-service";

const DeactivationConfirmationPage = ({ setLoggedIn }) => {
    const communityContext = useContext(CommUnityContext);

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // Deactivates user by sending delete request to server
    // Clears auth token and logs user out 
    // Pushes location to the deactivation success page
    const handleDeactivation = () => {
        setLoading(true)
        const userId = communityContext.user.id;
        UserDataService.deleteUser(userId)
            .then(res => {
                TokenService.clearAuthToken();
                setLoading(false)
                communityContext.logout();
                navigate("/deactivated");
            })
    }

    return (
        <Container>
            <div className={styles.container}>
                <h3 className={styles.header}>Deactivate Account</h3>

                <p>We're sad to see you go. Are you sure you want to deactivate your account?</p>
                <div className={styles.buttonSection}>
                    <ButtonDark type="button" onClick={() => navigate("/account")}>Nevermind!</ButtonDark>
                    <ButtonLight className={styles.yesButton} type="submit" onClick={handleDeactivation} loading={loading.toString()}>Yes</ButtonLight>
                </div>
            </div>
        </Container>
    )
}

export default DeactivationConfirmationPage;

DeactivationConfirmationPage.propTypes = {
    setLoggedIn: PropTypes.func
}