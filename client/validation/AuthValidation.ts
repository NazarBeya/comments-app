import * as yup from "yup";

export const RegisterSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required")
    .email("Email is required"),
  password: yup.string().required("Password is required"),
  username: yup.string().required("Username is required"),
  file: yup.mixed().required(),
});

export const AuthSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required")
    .email("Email is required"),
  password: yup.string().required("Password is required"),
});

export type AuthFormValue = yup.InferType<typeof AuthSchema>;

export type RegisterFormValue = yup.InferType<typeof RegisterSchema>;
