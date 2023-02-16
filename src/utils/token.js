import jwtDecode from "jwt-decode"; // Library to decode tokens

// Function to check if token expired
export const hasExpiredToken = (token) => {

    // from here we extract the token expiration date: exp
    const { exp } = jwtDecode(token);
    // we check the current date we are now.
    const currentData = new Date().getTime();

    //if exp date is inferior than currentData it means the token expired, then true.
    if(exp <= currentData){ 
        return true
    }

    // if not, it exp date is bigger means the token did not expire, then false.
    return false; 
}
