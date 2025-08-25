import { ButtonHTMLAttributes } from "react";
import CheckIcon from "./icons/CheckIcon";

// UpdateButton 컴포넌트가 받을 props 타입을 정의함.
interface UpdateButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string; // 추가적인 스타일링을 위한 클래스
  isActive?: boolean; // 버튼의 활성화 여부, 색상 변경에 사용됨.
}

/**
 * 수정 완료 기능을 위한 전용 버튼 컴포넌트입니다.
 * 입체적인 그림자 효과와, 내용 수정 여부(isActive)에 따라 색상이 변경되는 기능이 있습니다.
 */
export default function UpdateButton({
  className = "",
  isActive = false,
  ...props
}: UpdateButtonProps) {
  /** isActive prop 값에 따라 버튼의 배경색을 결정합니다. */
  const bgColorClasses = isActive
    ? "bg-lime-300 hover:bg-lime-400 active:bg-lime-500" // 활성 상태 (수정된 내용 있을 때)
    : "bg-slate-200 hover:bg-slate-300 active:bg-slate-400"; // 비활성 상태
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
