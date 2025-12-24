import type { Product } from "../../interfaces/productInterfaces";
import { ErrorIcon, WarningIcon } from "../Icons";
import Loader from "../Loader";

interface props {
  products: Product[];
  isLoading: boolean;
  isError: boolean;
}

const LowStockTable = ({ products, isLoading, isError }: props) => {
  // 1. Loading / Error State
  if (isLoading || isError)
    return (
      <div className="w-full bg-white">
        <div className="w-full min-h-80 flex flex-col gap-4 justify-center items-center">
          {isError ? (
            <WarningIcon />
          ) : (
            <Loader size="md" variant="dark" />
          )}
          <p className="text-black font-bold uppercase tracking-wider">
            {isError ? "Gagal Memuat Data" : "Memuat Data Produk..."}
          </p>
        </div>
      </div>
    );

  // 2. Empty State
  if (products.length === 0)
    return (
      <div className="w-full bg-white">
        <div className="w-full min-h-80 flex flex-col gap-2 justify-center items-center">
          <div className="rounded-full bg-black/5 p-4">
            {/* Checkmark or similar could go here, simply text for now */}
            <span className="text-2xl">👍</span>
          </div>
          <p className="text-black font-black uppercase tracking-widest text-lg">
            Semua Stok Aman
          </p>
          <p className="text-black/50 text-sm font-medium">
            Tidak ada produk dengan stok rendah.
          </p>
        </div>
      </div>
    );

  // 3. Data Table
  return (
    <div className="w-full bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          {/* Header: Solid Black for High Contrast */}
          <thead className="bg-black text-white">
            <tr>
              <th className="p-4 text-xs font-black uppercase tracking-widest">
                Id #
              </th>
              <th className="p-4 text-xs font-black uppercase tracking-widest">
                Nama Produk
              </th>
              <th className="p-4 text-xs font-black uppercase tracking-widest text-center">
                Stok
              </th>
              <th className="p-4 text-xs font-black uppercase tracking-widest text-center">
                Status
              </th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="text-black">
            {products.map((product: Product) => (
              <tr
                key={product.id}
                className="border-b border-black/10 hover:bg-gray-50 transition-colors"
              >
                <td className="p-4 text-sm font-medium text-black/60">
                  #{product.id}
                </td>
                <td className="p-4 text-sm font-bold text-black uppercase">
                  {product.name}
                </td>
                <td className="p-4 text-sm font-black text-center text-black">
                  {product.stock}
                </td>
                <td className="p-4 text-sm text-center">
                  <div className="flex items-center justify-center gap-2">
                    {/* Conditional Styling for Critical vs Warning */}
                    <span
                      className={
                        product.stock < 5
                          ? "animate-pulse text-black"
                          : "text-black/60"
                      }
                    >
                      {product.stock < 5 ? <ErrorIcon /> : <WarningIcon />}
                    </span>

                    <span
                      className={`text-xs font-black uppercase tracking-wider ${
                        product.stock < 5 ? "text-red-600" : "text-black" // kept red for 'critical' logic, or change to "text-black underline" for pure B&W
                      }`}
                    >
                      {/* Pure B&W Override: replace text-red-600 with text-black if strict monochrome is desired */}
                      {product.stock < 5 ? "Sangat Rendah" : "Rendah"}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LowStockTable;
