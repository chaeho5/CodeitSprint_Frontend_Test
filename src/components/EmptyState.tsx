import Image from "next/image";

interface EmptyStateProps {
  imageSrc: string;
  message: string;
}

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
