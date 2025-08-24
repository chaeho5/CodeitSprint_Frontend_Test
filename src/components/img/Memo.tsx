import React from "react";
import localFont from "next/font/local";
import TextareaAutosize from "react-textarea-autosize";

const nanumSquareExtraBold = localFont({
  src: "../../fonts/NanumSquareNeoHv.woff2",
});

interface MemoProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
}

export default function Memo({
  className = "",
  value,
  onChange,
  ...props
}: MemoProps) {
  return (
    <div className={`relative h-[311px] w-full ${className}`}>
      {/* 👇 1. 이 div가 메모지 배경과 줄무늬를 모두 담당합니다. */}
      <div
        className="absolute inset-0 rounded-2xl bg-yellow-50 bg-[length:100%_32px] bg-[position:0px_22px]"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, transparent 30px, #FEF3C7 30px, #FEF3C7 32px)",
        }}
      />
      {/* 👇 1. 콘텐츠를 감싸는 새로운 flex-col 컨테이너 */}
      <div className="relative z-10 flex h-full flex-col">
        {/* 2. 제목 영역 */}
        <div
          className={`flex-shrink-0 pt-4 text-center text-base font-extrabold text-amber-800 ${nanumSquareExtraBold.className}`}
        >
          Memo
        </div>

        {/* 3. 입력 영역 (남은 공간을 모두 차지) */}
        <div className="flex flex-grow items-center justify-center overflow-y-auto px-6 pb-6">
          <TextareaAutosize
            value={value}
            onChange={onChange}
            {...props}
            className="w-full resize-none border-none bg-transparent text-center leading-8 text-slate-800 focus:outline-none"
            placeholder=""
            minRows={1}
          />
        </div>
      </div>
    </div>
  );
}
