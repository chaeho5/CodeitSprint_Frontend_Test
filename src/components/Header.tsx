// 헤더 컴포넌트
import Link from "next/link";
import LogoFull from "./img/LogoFull";
import LogoIcon from "./img/LogoIcon";

export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm">
      <div className="mx-auto flex h-[60px] max-w-screen-lg items-center px-5">
        <Link href="/">
          {/* md: 이상 (태블릿/데스크탑) 화면에서는 전체 로고를 보여줍니다. */}
          <div className="hidden md:block">
            <LogoFull />
          </div>
          {/* md: 미만 (모바일) 화면에서는 아이콘 로고만 보여줍니다. */}
          <div className="block md:hidden">
            <LogoIcon />
          </div>
        </Link>
      </div>
    </header>
  );
}
