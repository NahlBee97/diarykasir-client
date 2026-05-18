import * as Yup from "yup";

export const userSchema = Yup.object().shape({
  name: Yup.string().required("Nama pengguna wajib diisi"),
  password: Yup.string()
    .min(8, "password harus lebih dari 8 huruf") // Ensures at least 8 characters
    .required("password wajib diisi"),
  shift: Yup.string().required("Shift wajib diisi"),
});

export const editUserSchema = Yup.object().shape({
  name: Yup.string().optional(),
  shift: Yup.string().optional(),
});

export const setPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "password harus lebih dari 8 huruf")
    .required("password Baru wajib diisi"), // Changed from optional to required
  confirmPassword: Yup.string()
    .required("Konfirmasi password wajib diisi")
    .oneOf([Yup.ref("password")], "password tidak cocok"),
});
