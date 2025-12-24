import type { Order } from "../../interfaces/orderInterface";
import { formatCurrency } from "../../helper/formatCurrentcy";
import { format } from "date-fns";

interface props {
  isOpen: boolean;
  order: Order;
  onClose: () => void;
  onReprint?: () => void;
}

const OrderDetailsModal = ({ isOpen, order, onClose }: props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm font-sans p-4">
      {/* Modal Container: Card with Hard Shadow */}
      <div
        className="
            flex flex-col w-full max-w-md 
            bg-white rounded-xl border-2 border-black 
            shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
            overflow-hidden
        "
      >
        {/* Header */}
        <div className="p-6 border-b-2 border-black bg-gray-50">
          <p className="text-4xl font-black leading-none tracking-tighter text-black uppercase">
            Order #{order.id}
          </p>
          <p className="mt-2 font-bold text-black/50 uppercase tracking-wide text-sm">
            {format(order.createdAt, "dd MMMM yyyy • HH:mm")}
          </p>
        </div>

        {/* Itemized List */}
        <div className="p-6 flex flex-col gap-3">
          {order.items.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-start gap-x-4"
            >
              <div className="flex flex-col">
                <p className="text-black text-sm font-bold uppercase">
                  {item.product?.name}
                </p>
                <p className="text-black/50 text-xs font-bold">
                  Qty: {item.quantity}
                </p>
              </div>
              <p className="text-black text-sm font-black text-right">
                {formatCurrency(item.product?.price as number)}
              </p>
            </div>
          ))}
        </div>

        {/* Receipt Divider (Dashed) */}
        <div className="px-6">
          <hr className="border-t-2 border-dashed border-black/20" />
        </div>

        {/* Total Section */}
        <div className="p-6">
          <div className="flex justify-between items-end gap-x-6">
            <p className="text-xl font-black leading-none text-black tracking-tight">
              TOTAL
            </p>
            <p className="text-4xl font-black leading-none text-right text-black tracking-tighter">
              {formatCurrency(order.totalAmount)}
            </p>
          </div>
        </div>

        {/* Button Group */}
        <div className="p-6 pt-0">
          <button
            onClick={onClose}
            className="
                w-full cursor-pointer items-center justify-center 
                rounded-lg h-12 px-5 
                border-2 border-black bg-white 
                text-base font-black uppercase tracking-widest text-black
                hover:bg-black hover:text-white 
                active:scale-95
                transition-all duration-200
            "
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
