import * as Yup from "yup";

export const productSchema = Yup.object().shape({
  name: Yup.string().required("Nama produk wajib diisi"),
  price: Yup.number()
    .typeError("Harga harus berupa angka")
    .positive("Harga harus bernilai positif")
    .min(1000, "Harga minimal Rp 1.000")
    .required("Harga wajib diisi"),
    stock: Yup.number()
    .typeError("Stok harus berupa angka")
    .integer("Stok harus berupa bilangan bulat")
    .min(0, "Stok tidak boleh negatif")
    .required("Stok wajib diisi"),
    category: Yup.string().required("Kategori wajib diisi"),
  });
  
  export const editProductSchema = Yup.object().shape({
    name: Yup.string().optional(),
    price: Yup.number()
    .typeError("Harga harus berupa angka")
    .positive("Harga harus bernilai positif")
    .min(1000, "Harga minimal Rp 1.000")
    .optional(),
  stock: Yup.number()
    .typeError("Stok harus berupa angka")
    .integer("Stok harus berupa bilangan bulat")
    .min(0, "Stok tidak boleh negatif")
    .optional(),
  category: Yup.string().optional(),
});
