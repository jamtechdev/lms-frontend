import * as yup from "yup";

export const createStudentSchema = yup.object().shape({
    first_name: yup.string().trim().required("First name is required"),
    last_name: yup.string().trim().required("Last name is required"),
    email: yup.string().email("Enter a valid email address").required("Email is required."),
    student_type: yup.string().trim().required("Student type is required."),
    phone: yup.string().trim().required("Phone number is required").min(10, "Phone number must be 10 digits long").max(10, "Phone number must be 10 digits long"),
    address: yup.string().trim().required("Address is required"),
    student_level: yup.number().required("Student level is required"),
    lock_code: yup.number().required("Lock code is required"),
    lock_code_enabled: yup.boolean().required("Lock code enabled is required"),
    password: yup.string().required("Password is required"),
    password_confirmation: yup.string().required("Confirm Password is required"),
});