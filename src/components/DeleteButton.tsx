// 삭제하기 버튼 
import { ButtonHTMLAttributes } from "react";
import XIcon from "./icons/XIcon";

interface DeleteButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export default function DeleteButton({
  className = "",
  disabled,
  ...props
}: DeleteButtonProps) {
  return (
    <div
      className={`relative h-14 w-[168px] transition-all duration-300 ${
        disabled ? "opacity-50" : ""
      }`}
    >

      <div className="absolute left-1 top-1 h-[52px] w-[164px] rounded-[24px] border-2 border-slate-900 bg-slate-900 transition-all duration-300" />

      <button
        type="button"
        className={`absolute left-0 top-0 h-[52px] w-[164px] rounded-[24px] border-2 border-slate-900 transition-colors ${
          disabled
            ? "bg-slate-200"
            : "bg-rose-500 hover:bg-rose-600 active:bg-rose-700"
        } ${className}`}
        disabled={disabled}
        {...props}
      >
        <div className="flex h-full items-center justify-center gap-1">
          <XIcon
            className={`h-4 w-4 ${disabled ? "text-slate-900" : "text-white"}`}
          />
          <span
            className={`text-center text-base font-bold leading-normal ${
              disabled ? "text-slate-900" : "text-white"
            }`}
            style={{
              fontFamily:
                "NanumSquare, -apple-system, Roboto, Helvetica, sans-serif",
            }}
          >
            삭제하기
          </span>
        </div>
      </button>
    </div>
  );
}
