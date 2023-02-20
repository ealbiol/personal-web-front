const SERVER_IP = "localhost:3977";

export const ENV = {
    BASE_PATH: `http://${SERVER_IP}`,
    BASE_API: `http://${SERVER_IP}/api/v1`,
    API_ROUTES: {
        //ENDPOINTS ROUTES: Matcing the backend ones
        REGISTER: "auth/register", // API_ROUTES.REGISTER is the same endpoint/url as in insomnia: auth/register
        LOGIN: "auth/login",
        REFRESH_ACCESS_TOKEN: "auth/refresh_access_token",
        USER_ME: "user/me",
        USER: "user",
        USERS: "users",
        MENU: "menu",
    },
    JWT: {
        ACCESS: "access",
        REFRESH: "refresh",
    }
}