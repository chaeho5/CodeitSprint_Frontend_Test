// 메인 페이지에 할 일 목록이 비어있는 경우
import Image from "next/image";

/**
 * EmptyState 컴포넌트가 받을 props 타입을 정의합니다.
 * {string} imageSrc - 표시될 이미지의 경로
 * {string} message - 표시될 텍스트 메시지
 */
interface EmptyStateProps {
  imageSrc: string;
  message: string;
}

/**
 * 목록이 비어있을 때 사용자에게 표시될 UI 컴포넌트입니다.
 * 이미지와 메시지를 받아 화면에 렌더링합니다.
 */
export default function EmptyState({ imageSrc, message }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-lg bg-slate-100 p-8 text-center">
      <Image
        src={imageSrc}
        alt="Empty state illustration"
        width={150}
        height={150}
      />
      <p className="whitespace-pre-wrap text-slate-500">{message}</p>
    </div>
  );
}
