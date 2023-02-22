import { ENV } from "../utils";


export class Post {

    baseApi = ENV.BASE_API;

    //Create POSTS / POST
    async createPost(accessToken, data) { // data is post info
        try {
            const formData = new FormData(); // Necessary in order to send images.
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key])
            })

            if (data.file) {
                formData.append("miniature", data.file);
            }

            const url = `${this.baseApi}/${ENV.API_ROUTES.POST}`;

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
            throw error
        }
    }


    //Get POSTS / GET
    async getPosts(page = 1, limit = 10) { //Getting pagination
        try {
            const pageFilter = `page=${page}`;
            const limitFilter = `limit=${limit}`;
            const url = `${this.baseApi}/${ENV.API_ROUTES.POST}?${pageFilter}&${limitFilter}`;

            const response = await fetch(url);

            const result = await response.json();

            if (response.status !== 200) throw result;

            return result;
        } catch (error) {
            throw error
        }
    }

    // UPDATE BLOG POST / PATCH
    async updatePost(accessToken, idPost, data) {
        try {
            const formData = new FormData();

            Object.keys(data).forEach((key) => {
                formData.append(key, data[key])
            })

            if (data.file) {
                formData.append("miniature", data.file);
            }

            const url = `${this.baseApi}/${ENV.API_ROUTES.POST}/${idPost}`;

            const params = {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                body: formData,
            };

            const response = await fetch(url, params);
            const result = await response.json();

            if (response.status !== 200) throw result;

            return result;
        } catch (error) {
            throw error
        }
    }

    // ELIMINATE POST / DELETE
    async deletePost(accessToken, idPost){
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.POST}/${idPost}`;
            const params = {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
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