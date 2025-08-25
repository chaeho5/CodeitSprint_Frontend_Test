// 할 일 목록의 개별 목록을 담당하는 컴포넌트
"use client";

import { useState, useEffect, useRef, KeyboardEvent } from "react";
import Link from "next/link";
import CheckIcon from "./icons/CheckIcon";

/**
 * TodoItem 컴포넌트가 받을 props 타입을 정의
 */
interface TodoItemProps {
  id: number; // 할 일의 고유 ID
  name: string; // 할 일의 내용
  isCompleted: boolean; // 완료 여부
  onToggle: () => void; // 체크박스 클릭 시 호출될 함수
  align?: "left" | "center"; // 텍스트 정렬
  Underline?: boolean; // 텍스트 밑줄 여부
  isEditable?: boolean; // 인라인 수정 가능 여부
  onNameChange?: (newName: string) => void; // 이름 수정 시 호출될 함수
}

/**
 * 할 일 목록의 개별 항목을 표시하는 컴포넌트 입니다.
 * 표시, 상태 변경, 인라인 수정, 상세 페이지 링크 기능을 모두 담당합니다.
 */
export default function TodoItem({
  id,
  name,
  isCompleted,
  onToggle,
  align = "left",
  Underline = false,
  isEditable = false,
  onNameChange,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false); // 수정 중인지 여부를 관리하는 내부 상태
  const [currentName, setCurrentName] = useState(name); // 수정 중인 텍스트를 임시로 저장하는 내부 상태
  const inputRef = useRef<HTMLInputElement>(null); // <input> 태그 전용

  /**
   * 수정 모드(isEditing)가 활성화되면 input 요소에 자동으로 포커스를 줍니다.
   */
  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  /**
   * 이름 수정 완료 시 호출되는 함수. (Enter 키 또는 포커스 아웃)
   * 내용이 변경되었을 경우에만 onNameChange 콜백을 호출합니다.
   */
  const handleFinishEditing = () => {
    setIsEditing(false);
    if (onNameChange && name !== currentName) {
      onNameChange(currentName);
    } else {
      // 변경 사항이 없으면 원래 이름으로 되돌립니다.
      setCurrentName(name);
    }
  };

  /**
   * input 요소에서 키보드 입력 시 호출되는 함수.
   * Enter 키는 수정 완료, Esc 키는 수정을 취소합니다.
   */
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handleFinishEditing();
    }
    if (e.key === "Escape") {
      setIsEditing(false);
      setCurrentName(name);
    }
  };

  // 체크박스와 텍스트/입력창 UI를 포함하는 변수
  const itemContent = (
    <>
      <div
        onClick={(e) => {
          e.preventDefault(); // Link 이동 방지
          e.stopPropagation(); // 이벤트 버블링 방지
          onToggle();
        }}
        className={`ml-[-5px] flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 text-2xl transition-colors ${
          isCompleted
            ? "border-violet-600 bg-violet-600"
            : "border-slate-900 bg-yellow-50"
        }`}
      >
        {isCompleted && <CheckIcon className="text-white" />}
      </div>

      {/* isEditing 상태에 따라 input 또는 span을 조건부 렌더링 */}
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={currentName}
          onChange={(e) => setCurrentName(e.target.value)}
          onBlur={handleFinishEditing}
          onKeyDown={handleKeyDown}
          className="h-full w-full border-none bg-transparent text-center text-lg text-slate-800 focus:outline-none"
        />
      ) : (
        // 👇 4. 텍스트 span의 className을 수정했습니다.
        <span
          onClick={() => isEditable && setIsEditing(true)}
          className={`transition-colors ${Underline ? "underline" : ""} ${
            isCompleted ? "text-slate-900 line-through" : "text-slate-900"
          }`}
        >
          {name}
        </span>
      )}
    </>
  );

  // isCompleted 상태에 따라 바뀌는 공통 스타일 클래스
  const commonClassName = `flex h-[52px] w-full items-center gap-4 border-2 px-4 transition-colors ${
    align === "center" ? "justify-center" : ""
  } ${
    isCompleted
      ? "rounded-[27px] border-slate-900 bg-violet-100"
      : "rounded-[27px] border-slate-900 bg-white"
  }`;

  // isEditable prop에 따라 Link 태그로 감싸거나 일반 div로 감쌉니다.
  if (isEditable) {
    return <div className={commonClassName}>{itemContent}</div>;
  }

  return (
    <Link href={`/items/${id}`} className={commonClassName}>
      {itemContent}
    </Link>
  );
}
