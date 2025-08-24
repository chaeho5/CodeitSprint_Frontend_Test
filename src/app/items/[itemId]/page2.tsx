"use client";

import LogoFull from "@/components/img/LogoFull";

export default function TodoDetailPage2({
  params,
}: {
  params: { itemId: string };
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header/GNB */}
      <header className="w-full h-[60px] bg-white border-b border-slate-200 flex justify-center items-center">
        <div className="w-full max-w-[1920px] px-[360px] flex items-center">
          <LogoFull />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex justify-center items-center py-[60px]">
        <div className="w-[1200px] h-[1020px] bg-white">
        </div>
      </main>
    </div>
  );
}
