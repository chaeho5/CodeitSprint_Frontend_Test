import { ButtonHTMLAttributes, ReactNode } from "react";
import PlusIcon from "./icons/PlusIcon";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: "primary" | "danger"; // variant 옵션을 늘릴 수 있습니다.
  size?: "large" | "small";
}

export default function Button({
  children = "추가하기",
  variant = "primary", // 기본값을 "primary"로 변경
  size = "large",
  className = "",
  disabled,
  ...props
}: ButtonProps & { disabled?: boolean }) {
  // 👇 size에 따라 스타일을 정의합니다.
  const sizeStyles = {
    large: "h-14 w-14 md:w-[168px]",
    small: "h-12 w-12 md:w-[140px]",
  };

  const shadowSizeStyles = {
    large: "h-[56px] w-[52px] md:w-[164px]",
    small: "h-[44px] w-[44px] md:w-[136px]",
  };

  // 👇 variant에 따라 색상 스타일을 정의합니다.
  const variantStyles = {
    primary: "bg-violet-600 hover:bg-violet-700 active:bg-violet-800",
    danger: "bg-rose-500 hover:bg-rose-600 active:bg-rose-700",
  };

  return (
    // 👇 sizeStyles를 적용합니다.
    <div
      className={`relative ${sizeStyles[size]} transition-all duration-300 ${
        disabled ? "opacity-100" : ""
      }`}
    >
      {/* Shadow layer */}
      <div
        className={`absolute left-1 top-1 rounded-[24px] border-2 border-slate-900 bg-slate-900 transition-all duration-300 ${shadowSizeStyles[size]}`}
      />

      {/* Main button */}
      <button
        className={`absolute left-0 top-0 rounded-[24px] border-2 border-slate-900 transition-colors ${
          shadowSizeStyles[size]
        } ${
          disabled
            ? "bg-slate-200"
            : // 👇 variantStyles를 적용합니다.
              variantStyles[variant]
        } ${className}`}
        {...props}
      >
        <div className="flex h-full items-center justify-center gap-1">
          <PlusIcon
            className={`h-4 w-4 ${disabled ? "text-slate-900" : "text-white"}`}
          />
          <span
            className={`hidden text-center text-base font-bold leading-normal md:inline ${
              disabled ? "text-slate-900" : "text-white"
            }`}
          >
            {children}
          </span>
        </div>
      </button>
    </div>
  );
}
