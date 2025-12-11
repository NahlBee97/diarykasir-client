const StatusBadge = ({ status }: { status: string }) => {
  let styles = "";
  let dotColor = "";

  if (status === "Low Stock") {
    styles = "bg-yellow-400/10 text-yellow-400";
    dotColor = "bg-yellow-400";
  } else if (status === "In Stock") {
    styles = "bg-green-500/10 text-green-400";
    dotColor = "bg-green-500";
  } else if (status === "Out of Stock") {
    styles = "bg-red-500/10 text-red-500";
    dotColor = "bg-red-500";
  }

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full px-2 py-1 text-xs ${styles}`}
    >
      <span className={`h-2 w-2 rounded-full ${dotColor}`}></span>
      {status}
    </div>
  );
};

export default StatusBadge;