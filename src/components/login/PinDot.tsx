export const PinDot = ({ filled }: { filled: boolean }) => (
  <div
    className={`h-4 w-4 rounded-full border-2 border-black transition-all duration-200 ${
      filled
        ? "bg-black scale-110" // Solid black, slightly larger when filled
        : "bg-transparent scale-100" // Hollow ring when empty
    }`}
  ></div>
);
