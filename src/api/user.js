// AUTHENTICATION USER API
import { ENV } from "../utils";

export class User {
    baseApi = ENV.BASE_API;

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
}