"use client"; // 👈 1. "use client"를 추가해야 합니다.

import { useState, useEffect, useRef, KeyboardEvent } from "react"; // 👈 2. hook들을 import 합니다.
import Link from "next/link";
import CheckIcon from "./icons/CheckIcon";

interface TodoItemProps {
  id: number;
  name: string;
  isCompleted: boolean;
  onToggle: () => void;
  align?: "left" | "center";
  Underline?: boolean;
  isEditable?: boolean;
  onNameChange?: (newName: string) => void;
}

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
  const [isEditing, setIsEditing] = useState(false);
  const [currentName, setCurrentName] = useState(name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleFinishEditing = () => {
    setIsEditing(false);
    if (onNameChange && name !== currentName) {
      onNameChange(currentName);
    } else {
      // 변경 사항이 없으면 원래 이름으로 되돌립니다.
      setCurrentName(name);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handleFinishEditing();
    }
    if (e.key === "Escape") {
      setIsEditing(false);
      setCurrentName(name);
    }
  };

  const itemContent = (
    <>
      {/* 👇 3. 체크박스 div의 className을 수정했습니다. */}
      <div
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
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

  const commonClassName = `flex h-[52px] w-full items-center gap-4 border-2 px-4 transition-colors ${
    align === "center" ? "justify-center" : ""
  } ${
    isCompleted
      ? "rounded-[27px] border-slate-900 bg-violet-100"
      : "rounded-[27px] border-slate-900 bg-white"
  }`;

  if (isEditable) {
    return <div className={commonClassName}>{itemContent}</div>;
  }

  return (
    <Link href={`/items/${id}`} className={commonClassName}>
      {itemContent}
    </Link>
  );
}
