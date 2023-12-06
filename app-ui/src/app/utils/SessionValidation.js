import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
    password: Yup.string()
        .min(6, "Password must be 6 character length")
        .required("Password is required!"),
    email: Yup.string().email('Invalid Email address').required('Email is required!'),
});

export const validationSignupSchema = Yup.object().shape({
    name: Yup.string().required('Name is required!'),
    email: Yup.string().email('Invalid Email address').required('Email is required!'),
    phone_number: Yup.string().required('Phone number is required!'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required!'),
});