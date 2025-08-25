// 수정 페이지에 있는 노란 메모 박스
import React from "react";
import localFont from "next/font/local";
import TextareaAutosize from "react-textarea-autosize";

// Memo 타이틀에 사용될 나눔스퀘어 네오 ExtraBold폰트를 정의
const nanumSquareExtraBold = localFont({
  src: "../../fonts/NanumSquareNeoHv.woff2",
});

/**
 * Memo 컴포넌트가 받을 props 타입을 정의합니다.
 * {string} value - textarea에 표시될 텍스트 값
 * {(e: React.ChangeEvent<HTMLTextAreaElement>) => void} onChange - 텍스트 변경 시 호출될 함수
 * {string} [className] - 추가적인 스타일링을 위한 클래스
 */
interface MemoProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
}

/**
 * 줄무늬 배경을 가진 메모 입력창 컴포넌트입니다.
 * 텍스트 내용에 따라 높이가 자동으로 조절됩니다.
 */
export default function Memo({
  className = "",
  value,
  onChange,
  ...props
}: MemoProps) {
  return (
    <div className={`relative h-[311px] w-full ${className}`}>
      {/* CSS Gradient로 줄무늬를 포함한 메모지 배경을 그립니다. */}
      <div
        className="absolute inset-0 rounded-2xl bg-yellow-50 bg-[length:100%_32px] bg-[position:0px_22px]"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, transparent 30px, #FEF3C7 30px, #FEF3C7 32px)",
        }}
      />
      <div className="relative z-10 flex h-full flex-col">
        {/* 제목(Memo) 영역 */}
        <div
          className={`flex-shrink-0 pt-4 text-center text-base font-extrabold text-amber-800 ${nanumSquareExtraBold.className}`}
        >
          Memo
        </div>

        {/* 텍스트 입력 영역 */}
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
