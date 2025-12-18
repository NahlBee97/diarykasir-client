import { useQuery } from "@tanstack/react-query";
import StatCard from "../../components/admin/StatCard";
import { WarningIcon } from "../../components/Icons";
import { getTopProducts } from "../../services/productServices"; // Needs updating
import type { Product } from "../../interfaces/productInterfaces";
import { formatCurrency } from "../../helper/formatCurrentcy";
import { getOrderSummary } from "../../services/orderServices"; // Needs updating
import Loader from "../../components/Loader";
import { useState } from "react"; // Import useState

const GLOW_BORDER = "0 0 1px #f9f906, 0 0 4px #f9f906, 0 0 8px #f9f906";
const GLOW_TEXT = "0 0 2px #f9f906, 0 0 5px #f9f906";

interface OrderSummary {
  totalRevenue: number;
  totalSales: number;
  averageSaleValue: number;
  itemsSold: number;
}

// Helper function to format Date object into YYYY-MM-DD string for input default
const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  // Ensure month is 1-indexed and padded
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const Report = () => {
  const now = new Date();

  // 1. ADD DATE STATE, initialized to today's date
  const [startDate, setStartDate] = useState<string>(formatDate(now));
  const [endDate, setEndDate] = useState<string>(formatDate(now));

  // --- TOP PRODUCTS QUERY ---
  const {
    data: topProducts = [],
    isLoading: isTopProductsLoading,
    error: topProductsError,
  } = useQuery({
    // 2. Add date range to queryKey to trigger refetch
    queryKey: ["topProducts", startDate, endDate],
    // 2. Pass dates to the service function
    queryFn: () => getTopProducts(startDate, endDate),
  });

  // --- ORDER SUMMARY QUERY ---
  const {
    data: orderSummary = {
      totalRevenue: 0,
      totalSales: 0,
      averageSaleValue: 0,
      itemsSold: 0,
    },
    isLoading: isSummaryLoading,
    error: summaryError,
  } = useQuery<OrderSummary>({
    // 2. Add date range to queryKey to trigger refetch
    queryKey: ["summary", startDate, endDate],
    // 2. Pass dates to the service function
    queryFn: () => getOrderSummary(startDate, endDate),
  });

  // 3. HANDLERS to update state and trigger refetch
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  return (
    <main className="flex flex-1 flex-col p-6 lg:p-10">
      <div className="layout-content-container flex flex-col w-full max-w-7xl mx-auto flex-1 h-full">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <h1
            className="text-[#f9f906] text-4xl font-bold leading-tight tracking-[-0.033em]"
            style={{ textShadow: GLOW_TEXT }}
          >
            LAPORAN PENJUALAN
          </h1>

          {/* Filters & Actions */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Start Date Input */}
            <div className="relative">
              <label
                htmlFor="start-date"
                className="absolute -top-2.5 left-3 bg-[#0A0A0A] px-1 text-xs text-[#f9f906]/80"
              >
                Awal
              </label>
              <input
                id="start-date"
                type="date"
                className="h-10 w-full rounded-md border border-[#f9f906]/50 bg-[#0A0A0A] px-4 text-sm text-[#f9f906] placeholder-transparent outline-none focus:border-[#f9f906] focus:ring-1 focus:ring-[#f9f906] transition-shadow"
                style={{ colorScheme: "dark" }}
                value={startDate} // Controlled input
                onChange={handleStartDateChange} // Add handler
              />
            </div>

            {/* End Date Input */}
            <div className="relative">
              <label
                htmlFor="end-date"
                className="absolute -top-2.5 left-3 bg-[#0A0A0A] px-1 text-xs text-[#f9f906]/80"
              >
                Akhir
              </label>
              <input
                id="end-date"
                type="date"
                className="h-10 w-full rounded-md border border-[#f9f906]/50 bg-[#0A0A0A] px-4 text-sm text-[#f9f906] placeholder-transparent outline-none focus:border-[#f9f906] focus:ring-1 focus:ring-[#f9f906] transition-shadow"
                style={{ colorScheme: "dark" }}
                value={endDate} // Controlled input
                onChange={handleEndDateChange} // Add handler
              />
            </div>

            {/* Export Button
            <button className="flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[#f9f906] px-5 text-sm font-medium text-black transition-colors hover:bg-yellow-400">
              <DownloadIcon />
              <span>Export Report</span>
            </button> */}
          </div>
        </div>

        {/* Stats Grid - Remains the same, but now uses data filtered by date state */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <StatCard
            title="TOTAL OMSET"
            // Ensure you are handling the integer-as-cents to dollar conversion here if your backend returns cents!
            value={orderSummary?.totalRevenue}
            isCurrency
            isLoading={isSummaryLoading}
            isError={!!summaryError}
          />
          <StatCard
            title="NILAI PENJUALAN RATA - RATA"
            value={orderSummary.averageSaleValue}
            isCurrency
            isLoading={isSummaryLoading}
            isError={!!summaryError}
          />
          <StatCard
            title="TOTAL ORDER"
            value={orderSummary.totalSales}
            isLoading={isSummaryLoading}
            isError={!!summaryError}
          />
          <StatCard
            title="ITEM TERJUAL"
            value={orderSummary.itemsSold}
            isLoading={isSummaryLoading}
            isError={!!summaryError}
          />
        </div>

        {/* Top Selling Products Table - Remains the same, but uses data filtered by date state */}
        <div className="mt-10">
          <h2
            className="text-[#f9f906] text-[22px] font-bold leading-tight tracking-[-0.015em]"
            style={{ textShadow: GLOW_TEXT }}
          >
            PRODUK TERLARIS
          </h2>
          <div
            className="mt-4 overflow-hidden rounded-xl border border-[#f9f906]/50 bg-[#0A0A0A]"
            style={{ boxShadow: GLOW_BORDER }}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b border-[#f9f906]/20">
                  {!isTopProductsLoading && !topProductsError && (
                    <tr>
                      <th className="p-4 text-sm font-semibold uppercase text-[#f9f906]/70">
                        # ID
                      </th>
                      <th className="p-4 text-sm font-semibold uppercase text-[#f9f906]/70">
                        Nama
                      </th>
                      <th className="p-4 text-sm font-semibold uppercase text-[#f9f906]/70 text-right">
                        Jumlah Terjual
                      </th>
                      <th className="p-4 text-sm font-semibold uppercase text-[#f9f906]/70 text-right">
                        Total Omset
                      </th>
                    </tr>
                  )}
                </thead>
                <tbody>
                  {isTopProductsLoading || topProductsError ? (
                    <tr>
                      <td colSpan={3} className="p-10 text-center">
                        <div className="w-full flex flex-col gap-1 justify-center items-center">
                          {topProductsError ? (
                            <WarningIcon />
                          ) : (
                            <Loader size="md" />
                          )}
                          <p className="text-white">
                            {topProductsError
                              ? "Error Loading Products"
                              : "Loading Products..."}
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <>
                      {topProducts.map((product: Product) => (
                        <tr
                          key={product.id}
                          className="border-b border-[#f9f906]/10 last:border-none hover:bg-white/5 transition-colors"
                        >
                          <td className="p-4 text-sm text-white/90">
                            {product.id}
                          </td>
                          <td className="p-4 text-sm text-white/90">
                            {product.name}
                          </td>
                          {/* Assuming the service returns the units sold in a property, e.g., 'unitsSold' */}
                          <td className="p-4 text-sm text-white/90 text-right">
                            {product.sale || "N/A"}
                          </td>
                          {/* Assuming the service returns the calculated total revenue */}
                          <td className="p-4 text-sm text-white/90 text-right">
                            {formatCurrency(product.sale * product.price)}
                          </td>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Report;
