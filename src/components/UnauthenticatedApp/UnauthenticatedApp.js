import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { PropTypes } from 'prop-types';
import Nav from "../Nav/Nav";
import LandingPage from "../../routes/LandingPage/LandingPage";
import LoginPage from "../../routes/LoginPage/LoginPage";
import RegistrationPage from "../../routes/RegistrationPage/RegistrationPage";
import NotFoundPage from "../../routes/NotFoundPage/NotFoundPage";
import DeactivationSuccessPage from "../../routes/DeactivationSuccessPage/DeactivationSuccessPage";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

import styles from "./UnauthenticatedApp.module.css";

const UnauthenticatedApp = ({ isLoggedIn, setLoggedIn }) => {
  const location = useLocation();

  return (
    <main className={`${styles.main} ${location.pathname === '/login' || '/register' ? styles.authForm : undefined}`}>
      <Nav isLoggedIn={isLoggedIn} />
      <ErrorBoundary key={location.pathname}>
        <Routes>
          <Route exact path="/" element={<LandingPage setLoggedIn={setLoggedIn} isLoggedIn={isLoggedIn} />} />
          <Route path="/login" element={<LoginPage setLoggedIn={setLoggedIn} isLoggedIn={isLoggedIn} />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/deactivated" element={<DeactivationSuccessPage />} />
          <Route element={<NotFoundPage isLoggedIn={isLoggedIn} />} />
        </Routes>
      </ErrorBoundary>
    </main>
  )
}

export default UnauthenticatedApp;

UnauthenticatedApp.propTypes = {
  isLoggedIn: PropTypes.bool,
  setLoggedIn: PropTypes.func
}