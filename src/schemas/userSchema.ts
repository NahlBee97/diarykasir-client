import * as Yup from "yup";

export const userSchema = Yup.object().shape({
  name: Yup.string().required("Nama pengguna wajib diisi"),
  pin: Yup.number()
    .typeError("PIN harus berupa angka")
    .positive("PIN harus bernilai positif")
    .required("PIN wajib diisi"),
  shift: Yup.string().required("Shift wajib diisi"),
});

export const editUserSchema = Yup.object().shape({
  name: Yup.string().optional(),
  pin: Yup.number()
    .typeError("PIN harus berupa angka")
    .positive("PIN harus bernilai positif")
    .optional(),
  shift: Yup.string().optional(),
});
