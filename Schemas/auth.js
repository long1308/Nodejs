import Joi from "joi";
export const signupSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Tên không được để trống",
    "any.required": "Trường tên là bắt buộc",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email không được để trống",
    "any.required": "Trường Email là bắt buộc",
    "string.email": "Email không đúng định dạng",
  }),
  password: Joi.string().required().min(6).messages({
    "string.empty": "Mật khẩu không được để trống",
    "any.required": "Trường Mật khẩu là bắt buộc",
    "string.min": "Mật khẩu phải có ít nhất {#limit} ký tự",
  }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Mật khẩu không khớp",
    "string.empty": "Mật khẩu không được để trống",
    "any.required": "Trường confirm Mật khẩu là bắt buộc",
  }),
});
export const signinSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email không được để trống",
    "any.required": "Trường Email là bắt buộc",
    "string.email": "Email không đúng định dạng",
  }),
  password: Joi.string().required().min(6).messages({
    "string.empty": "Mật khẩu không được để trống",
    "any.required": "Trường Mật khẩu là bắt buộc",
    "string.min": "Mật khẩu phải có ít nhất {#limit} ký tự",
  }),
});
