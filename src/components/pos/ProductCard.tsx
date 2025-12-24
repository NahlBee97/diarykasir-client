import { formatCurrency } from "../../helper/formatCurrentcy";
import type { Product } from "../../interfaces/productInterfaces";

interface ProductCardProps {
  item: Product;
  onClick: () => void;
  disabled?: boolean;
}

const ProductCard = ({ item, onClick, disabled }: ProductCardProps) => {
  return (
    <button
      key={item.id}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`
        group relative flex flex-col aspect-square w-full overflow-hidden 
        rounded-2xl border border-black bg-white text-left
        transition-all duration-200 ease-out
        ${
          disabled
            ? "cursor-not-allowed opacity-50 grayscale"
            : "cursor-pointer hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-0 active:shadow-none active:scale-98"
        }
      `}
    >
      {/* Image Container - Grows to fill available space */}
      <div className="flex-1 w-full overflow-hidden border-b border-black bg-gray-50">
        <div
          className="h-full w-full bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-110"
          style={{
            backgroundImage: `url("${item.image}")`,
          }}
        />
      </div>

      {/* Content Container - White Background, Black Text */}
      <div className="flex w-full flex-col justify-center bg-white px-4 py-3">
        <p className="line-clamp-2 w-full text-xs font-bold tracking-tight text-gray-500 transition-colors group-hover:text-black">
          {item.name}
        </p>
        <p className="mt-0.5 text-base font-black text-black">
          {formatCurrency(item.price)}
        </p>
      </div>
    </button>
  );
};

export default ProductCard;
