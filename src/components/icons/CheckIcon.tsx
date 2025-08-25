//체크박스가 체크 됬을때 나오는 보라색 체크 표시
import { SVGProps } from "react";

/**
 * 체크(✓) 모양을 표시하는 재사용 가능한 SVG 아이콘 컴포넌트입니다.
 * {SVGProps<SVGSVGElement>} props - className, onClick 등 표준 SVG 속성을 전달받습니다.
 * <CheckIcon className="h-6 w-6 text-white" />
 */
export default function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8 16.2857L13.8182 22L24 12"
        stroke="currentColor" //부모 요소의 글자색을 따라감
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
