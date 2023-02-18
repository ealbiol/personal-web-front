// AUTHENTICATION USER API
import { ENV } from "../utils";

export class User {
    baseApi = ENV.BASE_API;

    // CONNECTING ENDPOINTS

    // - FUNCTION GET ME / GET
    async getMe(accessToken) {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.USER_ME}`;
            const params = {
                headers: {
                    Authorization: `Bearer ${accessToken}` //Receiving token as it is an authenticated petition
                }
            }

            const response = await fetch(url, params);
            const result = await response.json();

            if (response.status !== 200) throw result;

            return result;
        } catch (error) {
            throw error
        }
    }

    // FUNCTION CREATE USER (FROM ADMIN SITE) / POST
    async createUser(accessToken, data) { // Receiving data from the new user
        try {
            const formData = new FormData(); // Enables Multiparty since we are sending also images.
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key]) //Iterating through every key of data: firstname, etc.
            });

            // if user adds avatar:
            if (data.fileAvatar) {
                formData.append("avatar", data.fileAvatar)
            }

            const url = `${this.baseApi}/${ENV.API_ROUTES.USER}`;
            const params = {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                body: formData,
            };
            const response = await fetch(url, params);
            const result = await response.json();

            if (response.status !== 201) throw result;

            return result;
        } catch (error) {
            throw error;
        }
    }

    // FUNCTION TO GET USERS / GET
    async getUsers(accessToken, active = undefined) {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.USERS}?active=${active}`;
            const params = {
                "headers": { //when no method is specified is GET by default.
                    Authorization: `Bearer ${accessToken}`
                }
            }

            const response = await fetch(url, params);
            const result = await response.json();

            if (response.status !== 200) throw result;

            return result;
        } catch (error) {
            throw error;
        }
    }

    //FUNCTION TO UPDATE USERS / PATCH
    async updateUser(accessToken, idUser, userData) {
        try {
            const data = userData;
            if (!data.password) {
                delete data.password;
            }

            const formData = new FormData(); // Enables Multiparty since we are sending also images.
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key]) //Iterating through every key of data: firstname, etc.
            });

            // if user adds avatar:
            if (data.fileAvatar) {
                formData.append("avatar", data.fileAvatar)
            }

            const url = `${ENV.BASE_API}/${ENV.API_ROUTES.USER}/${idUser}`;
            const params = {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                body: formData
            };

            const response = await fetch(url, params);
            const result = await response.json();

            if(response.status !== 200) throw result;
            
            return result;
        } catch (error) {
            throw error
        }
    }
}