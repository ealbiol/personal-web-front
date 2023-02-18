// CONTROLLING AND VALIDATING USER FORM 
import * as Yup from "yup";

// Function setting initial values of form:
// If editing user, 'user' will have value and will give the data of the user instead of empty.
// That's made this way so that user doesn't have to fill again the data he doesn't want to modify.
export function initialValues(user) {
    return {
        avatar: user?.avatar || "",
        fileAvatar: null,
        firstname: user?.firstname || "",
        lastname: user?.lastname || "",
        email: user?.email || "",
        role: user?.role || "",
        password: "",
    }
}

//Function of validation shcema;
export function validationSchema(user) {
    return Yup.object({
        firstname: Yup.string().required(true),
        lastname: Yup.string().required(true),
        email: Yup.string().email(true).required(true),
        role: Yup.string().required(true),
        password: user ? Yup.string() : Yup.string().required(true),
    })
}