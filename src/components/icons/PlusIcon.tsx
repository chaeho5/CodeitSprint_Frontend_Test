// 십자가 모양 플러스 아이콘
import { SVGProps } from "react";

export default function PlusIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"    
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2 8L14 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M8 14L8 2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
