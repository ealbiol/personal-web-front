import { ENV } from "../utils";

export class Course {
    baseApi = ENV.BASE_API;

    // FUNCTION CREATE COURSE / POST
    async createCourse(accessToken, data) {
        try {
          console.log("ENTERING");
          const formData = new FormData();
          Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
          });
    
          if (data.file) {
            formData.append("miniature", data.file);
          }
    
          const url = `${this.baseApi}/${ENV.API_ROUTES.COURSE}`;
          const params = {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            body: formData,
          };
    
          const response = await fetch(url, params);
          const result = await response.json();
          console.log("RESPONSE RESULT", response,result)
          if (response.status !== 200) throw result;
    
          return result;
        } catch (error) {
            console.log("ERROR", error);
          throw error;
        }
      }


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

            if (response.status !== 200) throw result;

            return result;
        } catch (error) {
            throw error
        }
    }
}