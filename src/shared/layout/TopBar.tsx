import { ShieldCheck, Truck, RotateCcw } from "lucide-react";

export default function TopBar() {
  return (
    <div className="hidden border-b border-slate-800 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-slate-100 lg:block">
      <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-3 text-sm">
        <div className="flex items-center justify-center gap-12">
          <div className="flex items-center gap-2.5">
            <Truck size={18} />
            <span>Free shipping on orders over $100</span>
          </div>

          <div className="flex items-center gap-2.5">
            <RotateCcw size={18} />
            <span>30 Days Easy Returns</span>
          </div>
          
          <div className="flex items-center gap-2.5">
            <ShieldCheck size={18} />
            <span>Secure Payment</span>
          </div>
        </div>
      </div>
    </div>
  );
}