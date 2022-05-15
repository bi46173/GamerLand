import * as yup from "yup";

export const validationSchema = yup.object({
  subject: yup.string().required(),
  urgency: yup.string().required(),
  problem: yup.string().required(),
});
