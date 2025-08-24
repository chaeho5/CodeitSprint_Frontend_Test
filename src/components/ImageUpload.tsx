"use client";

import { useRef } from "react";
import NextImage from "next/image";
import { uploadImage } from "@/lib/api";
import PlusIcon from "./icons/PlusIcon";
import ImgIcon from "./icons/ImgIcon";

interface ImageUploadProps {
  imageUrl: string | null;
  onImageUpload: (url: string) => void;
}

export default function ImageUpload({
  imageUrl,
  onImageUpload,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleIconClick = () => {
    inputRef.current?.click();
  };

  // 👇 파일이 선택되면 서버에 업로드하는 함수
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const response = await uploadImage(file);
        onImageUpload(response.url); // 성공 시 부모에게 url 전달
      } catch (error) {
        console.error("Upload failed:", error);
        alert("이미지 업로드에 실패했습니다.");
      }
    }
  };

  return (
    <div className="relative h-[311px] w-full cursor-pointer overflow-hidden rounded-[24px] border-2 border-dashed border-slate-300 bg-slate-50 transition-colors hover:bg-slate-100">
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />

      {/* 👇 imageUrl 값에 따라 이미지를 보여주거나, 플레이스홀더를 보여줍니다. */}
      {imageUrl ? (
        <NextImage
          src={imageUrl}
          alt="업로드된 할 일 이미지"
          fill={true}
          style={{ objectFit: "cover" }} // 이미지가 영역을 꽉 채우도록 설정
        />
      ) : (
        <div
          onClick={handleIconClick}
          className="flex h-full w-full flex-col items-center justify-center gap-4"
        >
          <div className="text-slate-400">
            <ImgIcon className="h-[54px] w-[54px]" />
          </div>
          <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-slate-200">
            <PlusIcon className="h-6 w-6 text-slate-500" />
          </div>
        </div>
      )}
    </div>
  );
}
