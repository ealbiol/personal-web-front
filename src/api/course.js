import { ENV } from "../utils";

export class Course {
    baseApi = ENV.BASE_API;

    // FUNCTION GET COURSES / GET
    async getCourses(params) {
        try {
            // Pagination: page 1 by default
            const pageFilter = `page=${params?.page || 1}`;
            // limit courses per page. 10 by default.
            const limitFilter = `limit=${params?.limit || 10}`;
            //URL with pagination
            const url = `${this.baseApi}/${ENV.API_ROUTES.COURSE}?${pageFilter}&${limitFilter}`;

            const response = await fetch(url); // no authentication needed since it's public info.
            const result = await response.json();

            if(response.status !== 200) throw result;

            return result;
        } catch (error) {
            throw error
        }
    }
}