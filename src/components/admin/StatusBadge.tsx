const StatusBadge = ({ status }: { status: string }) => {
  const normalizedStatus = status.toLowerCase();

  let styles = "";

  // Logic for B&W Theme:
  // 1. Cukup (Good) -> Solid Black (Strongest visual)
  // 2. Rendah (Warning) -> Outlined (Standard)
  // 3. Habis (Critical) -> Dashed Border (Implies empty/broken)

  if (normalizedStatus === "rendah" || normalizedStatus === "low") {
    styles = "bg-white text-black border-2 border-black";
  } else if (
    normalizedStatus === "cukup" ||
    normalizedStatus === "active" ||
    normalizedStatus === "siang"
  ) {
    styles = "bg-black text-white border-2 border-black";
  } else if (
    normalizedStatus === "habis" ||
    normalizedStatus === "out of stock" ||
    normalizedStatus === "sangat rendah"
  ) {
    styles =
      "bg-white text-black border-2 border-dashed border-black opacity-60";
  } else {
    // Default fallback
    styles = "bg-white text-black border-2 border-black";
  }

  return (
    <div
      className={`
        inline-flex items-center justify-center 
        px-3 py-1 rounded-full 
        text-xs font-black uppercase tracking-widest
        ${styles}
      `}
    >
      {status}
    </div>
  );
};

export default StatusBadge;
