import { SVGProps } from "react";

export default function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 16 16" // 👈 제공해주신 코드의 viewBox
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4 4L12 12"
        stroke="currentColor" // 👈 색상을 props로 제어
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 4L4 12"
        stroke="currentColor" // 👈 색상을 props로 제어
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
