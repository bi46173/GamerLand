import * as yup from "yup";

export const validationSchema = [
  yup.object({
    oldPassword: yup.string().required("Current password is required"),
    newPassword: yup
      .string()
      .matches(
        /(?=^.{6,15}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
        "Password must have at least one uppercase,one digit and one non alphanumeric character and at most 15 characters long"
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
  }),
  yup.object({
    phoneNumber: yup.string().required("Phone number is required"),
  }),
];
