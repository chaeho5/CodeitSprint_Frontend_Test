import Link from "next/link";
import LogoFull from "./img/LogoFull";
import LogoIcon from "./img/LogoIcon";

export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm">
      <div className="mx-auto flex h-[60px] max-w-screen-lg items-center px-5">
        <Link href="/">
          <div className="hidden md:block">
            <LogoFull />
          </div>
          <div className="block md:hidden">
            <LogoIcon />
          </div>
        </Link>
      </div>
    </header>
  );
}
