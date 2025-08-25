import React from "react";

/**
 * Input 컴포넌트가 받을 props 타입을 정의합니다.
 * 표준 HTML input 태그의 모든 속성을 받을 수 있습니다.
 * {string} [className] - 추가적인 스타일링을 위한 클래스
 */
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

// 입체적인 그림자 효과가 있는 재사용 가능한 Input 컴포넌트
export default function Input({ className = "", ...props }: InputProps) {
  return (
    <div className={`relative w-full max-w-[1000px] h-14 ${className}`}>
      <div className="absolute left-1 top-1 w-full h-full rounded-[24px] border-2 border-slate-900 bg-slate-900" />

      {/* 실제 텍스트 입력을 담당하는 input 요소 */}
      <input
        className="relative w-full h-full rounded-[24px] border-2 border-slate-900 bg-slate-100 px-6 text-slate-900 placeholder:text-slate-500 focus:outline-none"
        // 부모로부터 받은 모든 props(value, onChange, placeholder 등)를 전달
        {...props}
      />
    </div>
  );
}
