// AUTHENTICATION AUTH API
import { ENV } from "../utils"; //Importing utils constants

export class Auth {
    baseApi = ENV.BASE_API

    // - FUNCTION NEW USER REGISTRATION / POST
    async register(data) { // It receives form that entered by user: email, password, checkbox
        try {
            // API_ROUTES.REGISTER is the same endpoint/url as in insomnia: auth/register
            const url = `${this.baseApi}/${ENV.API_ROUTES.REGISTER}`;
            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                //Body: POST object data to be sent
                body: JSON.stringify({
                    email: data.email,
                    password: data.password
                }),
            };
            // Petition execution:
            const response = await fetch(url, params);
            // Petiton result of petition execution:
            const result = await response.json();
            // If result goes wrong throw error:
            if (response.status !== 200) throw result;

            //If all good return result (user data):
            return result;
        } catch (error) {
            throw error;
        }
    }


    // - FUNCTION LOGIN
    async login(data) {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.LOGIN}`
            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }

            const response = await fetch(url, params);
            const result = await response.json();

            if (response.status !== 200) throw result;

            return result;
        } catch (error) {
            throw error;
        }
    }

    // FUNCTION TO REFRESH ACCESS TOKEN
    async refreshAccessToken(refreshToken) {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.REFRESH_ACCESS_TOKEN}`;
            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token: refreshToken,
                })
            }
            const response = await fetch(url, params);
            const result = await response.json();

            if (response.status !== 200) throw result

            return result //Obtaining new refresh token
        } catch (error) {
            throw error
        }
    }


    // FUNCTIONS LOCALSTORAGE - ACCESS TOKEN

    // FUNCTION SAVING ACCESS TOKEN IN LOCALSTORAGE
    setAccessToken(token) {
        localStorage.setItem(ENV.JWT.ACCESS, token); // ENV.JWT.ACCESS const === "access". Made so that if we change the name we don't have to change it everywhere.
    }

    // FUNCTION TO OBTAIN ACCESS TOKEN FROM LOCAL STORAGE
    getAccessToken() {
        return localStorage.getItem(ENV.JWT.ACCESS);
        // We save "access": "token code"
    }


    // FUNCTIONS LOCALSTORAGE - REFRESH TOKEN

    // FUNCTION SAVING REFRESH TOKEN IN LOCALSTORAGE
    setRefreshToken(token) {
        localStorage.setItem(ENV.JWT.REFRESH, token); // ENV.JWT.REFRESH const === "refresh". Made so that if we change the name we don't have to change it everywhere.
    }

    // FUNCTION TO OBTAIN REFRESH TOKEN FROM LOCAL STORAGE
    getRefreshToken() {
        return localStorage.getItem(ENV.JWT.REFRESH);
    }


    // FUNCTION DELETING ALL TOKENS
    removeTokens() {
        localStorage.removeItem(ENV.JWT.ACCESS);
        localStorage.removeItem(ENV.JWT.REFRESH);
    }
}