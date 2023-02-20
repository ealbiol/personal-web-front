// MENU API. MENU FUNCTIONS
import { ENV } from "../utils";

export class Menu {
    baseApi = ENV.BASE_API;


    // FUNCTION TO GET ALL MENUS / GET
    async getMenu(active = undefined) {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.MENU}?active=${active}`;

            // No params needed as there is no authentication and method is GET.

            const response = await fetch(url);
            const result = await response.json();

            if (response.status !== 200) throw result;

            return result;
        } catch (error) {
            throw error;
        }
    };

}