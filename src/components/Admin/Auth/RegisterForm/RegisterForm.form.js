// REGISTER FORM CONFIGURATION

//Yup: Form validation framework
import * as Yup from "yup";


// Function that returns an object with the initial empty data of the form:
export function initialValues() {
    return {
        email: "",
        password: "",
        repeatPassword: "",
        conditionsAccepted: false,
    };
}


export function validationSchema() {
    return Yup.object({
        email: Yup.string()
            .email("Invalid Email")
            .required("Mandatory Field"),
        password: Yup.string().required("Mandatory Field"),
        repeatPassword: Yup.string()
            .required("Mandatory Field")
            .oneOf([Yup.ref("password")], "Passwords do not match"), //Function indicating field needs to have the same data as password.
        conditionsAccepted: Yup.bool().isTrue(true) // Meaning the checkbox needs to be checked/true to pass the validation.
    })
}