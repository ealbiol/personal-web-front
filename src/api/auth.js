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

            if(response.status !== 200) throw result;

            return result;
        } catch (error) {
            throw error;
        }
    }
}