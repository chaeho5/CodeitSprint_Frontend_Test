import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export default function Input({ className = '', ...props }: InputProps) {
  return (
    <div className={`relative w-full max-w-[1000px] h-14 ${className}`}>
      <div className="absolute left-1 top-1 w-full h-full rounded-[24px] border-2 border-slate-900 bg-slate-900" />
      
      <input
        className="relative w-full h-full rounded-[24px] border-2 border-slate-900 bg-slate-100 px-6 text-slate-900 placeholder:text-slate-500 focus:outline-none"
        {...props}
      />
    </div>
  );
}
