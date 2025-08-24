// src/types/todo.ts
export interface Todo {
  id: number;
  name: string;
  isCompleted: boolean;
  memo?: string | null;
  imageUrl?: string | null;
}