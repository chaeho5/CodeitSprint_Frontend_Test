// src/types/todo.ts
export interface Todo {
  id: number; // 고유 식별자
  name: string; // 할 일의 내용(이름)
  isCompleted: boolean; // 할 일의 완료 여부
  memo?: string | null; // 할 일에 대한 추가 메모
  imageUrl?: string | null; // 할 일에 첨부된 이미지의 URL
}