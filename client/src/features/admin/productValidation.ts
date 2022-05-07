import * as yup from "yup";

export const validationSchema = yup.object({
  name: yup.string().required(),
  type: yup.string().required(),
  information1: yup.string().required(),
  information2: yup.string().required(),
  information3: yup.string().required(),
  information4: yup.string().required(),
  price: yup.number().required().moreThan(1),
  quantityInStock: yup.number().required().min(0),
  file: yup.mixed().when("pictureUrl", {
    is: (value: string) => !value,
    then: yup.mixed().required("Please provide an image"),
  }),
});
