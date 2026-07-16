import { Baby } from "lucide-react";

export default function TopBar() {
  return (
  <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
     <div className="mx-auto flex h-14 max-w-[1600px] items-center px-4 lg:h-16 lg:px-6">
<div className="flex items-center gap-2 lg:gap-3">
     <Baby className="h-7 w-7 text-sky-600 lg:h-8 lg:w-8" />

          <div>
            <h1 className="text-base font-bold lg:text-lg">Baby Stuff</h1>

          <p className="hidden text-xs text-slate-500 sm:block">
              Подготовка к встрече малышки
            </p>
          </div>
        </div>


      </div>
    </header>
  );
}