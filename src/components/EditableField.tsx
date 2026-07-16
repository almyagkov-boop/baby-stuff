type Props = {
  label: string;
  value: string | number;
  onChange: (value: any) => void;

  type?: "text" | "number" | "textarea" | "select";

  options?: readonly string[];
};

export default function EditableField({
  label,
  value,
  onChange,
  type = "text",
  options = [],
}: Props) {
  return (
   <div className="space-y-1">
{label && (
  <label className="text-xs font-medium uppercase tracking-wide text-slate-500">
    {label}
  </label>
)}

      {type === "textarea" && (
        <textarea
          rows={3}
          value={String(value)}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
        />
      )}

      {type === "select" && (
        <select
          value={String(value)}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
        >
          {options.map((option) => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          ))}
        </select>
      )}

      {type === "text" && (
        <input
          value={String(value)}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
        />
      )}

      {type === "number" && (
        <input
          type="number"
          value={Number(value)}
          onChange={(e) =>
            onChange(Number(e.target.value))
          }
          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"        />
      )}
    </div>
  );
}