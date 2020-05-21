import config from "../config";
import TokenService from "./token-service";

const AuthApiService = {
    postUser(user) {
        return fetch(`${config.API_ENDPOINT}/users`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(user),
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()    
            )
    },
    postLogin({ email, password }) {
        return fetch(`${config.API_ENDPOINT}/auth/login`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()    
            )
            .then(res => {
                TokenService.saveAuthToken(res.authToken)
                return res.user
            })    
    },
    checkPassword(password) {
        return fetch(`${config.API_ENDPOINT}/auth/confirm-password`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                'Authorization': `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
            },
            body: JSON.stringify(password),
        })
            .then(res => 
                (!res.ok)
                    ? res.json()
                    : res.body
            )
    }
}

export default AuthApiService;