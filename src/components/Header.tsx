export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🧸</span>

          <div>
            <h1 className="text-xl font-bold text-slate-900">
              Baby Stuff
            </h1>

            <p className="text-xs text-slate-500">
              Everything for our baby
            </p>
          </div>
        </div>

        <button className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm transition hover:bg-slate-100">
          🌙
        </button>
      </div>
    </header>
  );
}