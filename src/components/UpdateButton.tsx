import { ButtonHTMLAttributes } from "react";
import CheckIcon from "./icons/CheckIcon";

interface UpdateButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  isActive?: boolean;
}

export default function UpdateButton({
  className = "",
  isActive = false,
  ...props
}: UpdateButtonProps) {
  const bgColorClasses = isActive
    ? "bg-lime-300 hover:bg-lime-400 active:bg-lime-500"
    : "bg-slate-200 hover:bg-slate-300 active:bg-slate-400";
  return (
    <div className="relative w-[168px] h-[56px] transition-all duration-300">
      {/* Shadow/offset layer */}
      <div className="absolute left-1 top-1 w-[164px] h-[52px] rounded-[24px] border-2 border-slate-900 bg-slate-900" />

      {/* Main button */}
      <button
        className={`absolute left-0 top-0 h-[52px] w-[164px] rounded-[24px] border-2 border-slate-900 transition-colors flex items-center justify-center gap-1 ${bgColorClasses} ${className}`}
        {...props}
      >
        <CheckIcon className="w-4 h-4 text-slate-900" />
        <span className="text-slate-900 text-center font-bold text-base leading-normal">
          수정 완료
        </span>
      </button>
    </div>
  );
}
