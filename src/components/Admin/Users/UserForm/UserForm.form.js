// CONTROLLING AND VALIDATING USER FORM 
import * as Yup from "yup";

// Function setting initial values of form:
export function initialValues() {
    return {
        avatar: "",
        fileAvatar: null,
        firstname: "",
        lastname: "",
        email: "",
        role: "",
        password: "",
    }
}

//Function of validation shcema;
export function validationSchema(){
    return Yup.object({
        firstname: Yup.string().required(true),
        lastname: Yup.string().required(true),
        email: Yup.string().email(true).required(true),
        role: Yup.string().required(true),
        password: Yup.string().required(true),
    })
}