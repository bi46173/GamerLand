import * as yup from "yup";

export const validationSchema = yup.object({
  subject: yup.string().required(),
  email: yup.string().required(),
  description: yup.string().required(),
});
