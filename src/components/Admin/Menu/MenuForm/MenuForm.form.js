// CONTROLLING AND VALIDATING MENU FORM 
import * as Yup from "yup";


export function initialValues() {
    return {
        title: "",
        path: "",
        protocol: "https://",
        active: true,
        order: undefined,
    }
}

//Function of validation shcema;
export function validationSchema() {
    return Yup.object({
        title: Yup.string().required(true),
        path: Yup.string().required(true),
        order: Yup.number().required(true),
    })
}