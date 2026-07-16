type BadgeProps = {
  children: React.ReactNode;
  color?: "blue" | "green" | "orange" | "red" | "gray";
};

const styles = {
  blue: "bg-sky-100 text-sky-700",
  green: "bg-green-100 text-green-700",
  orange: "bg-orange-100 text-orange-700",
  red: "bg-red-100 text-red-700",
  gray: "bg-slate-100 text-slate-700",
};

export default function Badge({
  children,
  color = "gray",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${styles[color]}`}
    >
      {children}
    </span>
  );
}