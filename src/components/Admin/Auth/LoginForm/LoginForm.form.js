// REGISTER FORM CONFIGURATION
import * as Yup from "yup";

// FORM EMPTY INITAL VALUES
export function initialValues() {
    return {
        email: "",
        password: ""
    };
}

// VALIDATION SCHEMA
export function validationSchema() {
    return Yup.object({
        email: Yup.string()
            .email("Invalid email")
            .required("Mandatory Field"),
        password: Yup.string().required("Mandatory Field")
    })
}