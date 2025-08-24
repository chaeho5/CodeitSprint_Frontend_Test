import { ButtonHTMLAttributes } from "react";
import PlusIcon from "./icons/PlusIcon";

interface PlusButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export default function PlusButton({ 
  className = "",
  ...props 
}: PlusButtonProps) {
  return (
    <div className="relative w-[56px] h-[56px]">
      {/* Shadow/offset layer */}
      <div className="absolute left-1 top-1 w-[55px] h-[52px] rounded-[24px] border-2 border-slate-900 bg-slate-900" />
      
      {/* Main button */}
      <button
        className={`absolute left-0 top-0 w-[55px] h-[52px] rounded-[24px] border-2 border-slate-900 bg-violet-600 hover:bg-violet-700 active:bg-violet-800 transition-colors flex items-center justify-center ${className}`}
        {...props}
      >
        <PlusIcon className="w-4 h-4 text-white" />
      </button>
    </div>
  );
}
