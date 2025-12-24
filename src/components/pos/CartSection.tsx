import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CartItem } from "../../interfaces/cartInterfaces";
import { getUserCart } from "../../services/cartServices";
import Loader from "../Loader";
import EmptyCart from "./EmptyCart";
import QuantitySelector from "./QuantitySelector";
import { useEffect, useState } from "react";
import PaymentModal from "./FinalizePayment";
import { createOrder } from "../../services/orderServices";
import type { NewOrder, OrderItem } from "../../interfaces/orderInterface";
import { Receipt } from "./Receipt";
import { formatCurrency } from "../../helper/formatCurrentcy";
import { WarningIcon } from "../Icons";
import CartItemCard from "./CartItemCard";

const CartSection = () => {
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [receiptData, setReceiptData] = useState<{
    // eslint-disable-next-line
    order: any;
    orderItems: OrderItem[];
  }>({ order: {}, orderItems: [] });

  useEffect(() => {
    if (receiptData && receiptData.order && receiptData.order.id) {
      setTimeout(() => {
        window.print();
      }, 100);
    }
  }, [receiptData]);

  const {
    data: cart = { items: [] },
    isLoading: isCartLoading,
    error: cartError,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getUserCart(),
  });

  const { mutate: checkout, isPending } = useMutation({
    mutationKey: ["checkout"],
    onSuccess: (data) => {
      setReceiptData(data);
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    mutationFn: async (orderData: NewOrder) => {
      return createOrder(orderData);
    },
    onError: (error) => {
      alert("Error: " + error);
    },
  });

  const total: number = cart.items.length
    ? cart.items.reduce(
        (sum: number, item: CartItem) =>
          sum + item.product.price * item.quantity,
        0
      )
    : 0;

  const handleConfirmPayment = (cashReceived: number, change: number) => {
    try {
      const orderData = {
        userId: cart.userId as number,
        totalAmount: total,
        paymentCash: cashReceived,
        paymentChange: change,
      };

      checkout(orderData);
    } catch (error) {
      console.error("Payment confirmation error:", error);
    } finally {
      setIsModalOpen(false);
    }
  };

  if (isCartLoading || cartError) {
    return (
      <div className="flex flex-col gap-2 w-full h-full items-center justify-center bg-white">
        {cartError ? <WarningIcon /> : <Loader size="lg" variant="dark" />}
        <h3 className="text-black font-bold uppercase">
          {cartError ? "Gangguan Memuat Keranjang..." : "Memuat Keranjang..."}
        </h3>
      </div>
    );
  }

  if (cart.items.length === 0) {
    return <EmptyCart />;
  }

  return (
    // 1. Added 'overflow-hidden' to Parent to contain the scroll area strictly
    <div className="flex flex-col w-full h-screen bg-white overflow-hidden">
      {/* Header (Fixed) */}
      <h2 className="shrink-0 text-black h-20 p-6 text-lg font-black leading-tight tracking-tight uppercase border-b border-black">
        Detail Pesanan
      </h2>

      {/* 2. Scrollable Area Logic:
         - flex-1: Takes up all remaining space between Header and Footer.
         - min-h-0: CRITICAL. Forces flex child to shrink below its content size, enabling scroll.
         - overflow-y-auto: Shows scrollbar when content overflows.
      */}
      <div className="flex-1 min-h-0 px-2 overflow-y-auto scrollbar-thin scrollbar-thumb-black/30 scrollbar-track-transparent hover:scrollbar-thumb-black/50">
        {cart.items.map((item: CartItem) => (
          <div
            key={item.id}
            className="flex items-center gap-4 px-4 py-4 justify-between border-b border-black/10 hover:bg-black/5 transition-colors"
          >
            <CartItemCard item={item} />

            <div className="shrink-0 flex flex-col items-end gap-2">
              <QuantitySelector item={item} />
              <p className="text-black text-base font-black">
                {formatCurrency(item.product.price * item.quantity)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer (Fixed) */}
      <div className="shrink-0 p-6 border-t border-black mt-auto bg-white">
        <div className="flex justify-between items-center mb-4">
          <p className="text-black font-medium text-lg uppercase tracking-wider">
            Total
          </p>
          <p className="text-black font-black text-2xl">
            {formatCurrency(total)}
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          disabled={isPending}
          className="group w-full bg-black text-white text-lg font-black py-4 rounded-full 
                     shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] 
                     hover:shadow-none hover:translate-y-0.5 
                     active:scale-[0.98] active:translate-y-0.5
                     transition-all duration-200 ease-out 
                     uppercase tracking-widest border border-black
                     disabled:bg-gray-300 disabled:shadow-none disabled:border-gray-300 disabled:cursor-not-allowed"
        >
          {isPending ? "MEMPROSES..." : "BAYAR SEKARANG"}
        </button>
      </div>

      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        total={total}
        onConfirm={handleConfirmPayment}
      />
      <Receipt data={receiptData} />
    </div>
  );
};

export default CartSection;
