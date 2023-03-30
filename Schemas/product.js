import joi from "joi";
export const productSchema = joi.object({
  name: joi.string().required().messages({
    "string.empty": "Name không được để trống",
    "any.required": "Trường Name này là bắt buộc",
    "string.base": "Name phải là 1 string",
  }),
  price: joi.number().required().messages({
    "any.required": "Trường Price  này là bắt buộc",
    "number.base": "Price phải là 1 number",
    "string.empty": "Price không đươc để trống",
  }),
  description: joi.string().messages({
    "string.empty": "Description không được để trống",
    "string.base": "Description phải là 1 string",
  }),
});
