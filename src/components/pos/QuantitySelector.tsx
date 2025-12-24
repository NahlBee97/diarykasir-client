import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CartItem } from "../../interfaces/cartInterfaces";
import { MinusIcon, PlusIcon } from "../Icons";
import {
  removeItemFromCart,
  updateItemQuantity,
} from "../../services/cartServices";
import { useEffect, useState } from "react";

interface updateItemData {
  itemId: number;
  quantity: number;
}

interface QuantitySelectorProps {
  item: CartItem;
}

const QuantitySelector = ({ item }: QuantitySelectorProps) => {
  const queryClient = useQueryClient();

  const [debouncedQty, setDebouncedQty] = useState<number>(item.quantity);

  const { mutate: updateItem, isPending } = useMutation({
    mutationFn: (data: updateItemData) => {
      return updateItemQuantity(data.itemId, data.quantity);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      alert("Error: " + error);
    },
  });

  const { mutate: deleteItem, isPending: isDeleting } = useMutation({
    mutationFn: (data: { itemId: number }) => {
      return removeItemFromCart(data.itemId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      alert("Error: " + error);
    },
  });

  useEffect(() => {
    if (debouncedQty === item.quantity) return;

    const timer = setTimeout(() => {
      updateItem({ itemId: item.id, quantity: debouncedQty });
    }, 1000); // 1000ms (1s)

    return () => clearTimeout(timer);
    // eslint-disable-next-line
  }, [debouncedQty]);

  const handleClickMinus = () => {
    if (debouncedQty > 1) {
      setDebouncedQty((prev) => (prev > 1 ? prev - 1 : 1));
    } else if (debouncedQty === 1 && item.quantity === 1) {
      deleteItem({ itemId: item.id });
    }
  };

  // Shared button class for consistency
  const buttonClass = `
    group flex h-7 w-7 items-center justify-center rounded-full 
    border border-black bg-white text-black 
    transition-all duration-200 
    hover:bg-black hover:text-white 
    active:scale-90
    disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-black
  `;

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleClickMinus}
        disabled={isPending || isDeleting}
        className={buttonClass}
        aria-label="Decrease quantity"
      >
        <MinusIcon />
      </button>

      <span className="min-w-5 text-center text-base font-black text-black">
        {debouncedQty}
      </span>

      <button
        onClick={() => setDebouncedQty((prev) => prev + 1)}
        disabled={isPending}
        className={buttonClass}
        aria-label="Increase quantity"
      >
        <PlusIcon />
      </button>
    </div>
  );
};

export default QuantitySelector;
