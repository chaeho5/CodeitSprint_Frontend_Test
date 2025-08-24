// src/lib/api.ts
import { Todo } from "@/types/todo";

const API_BASE_URL = "https://assignment-todolist-api.vercel.app/api";
const TENANT_ID = "Chaeho";

// 모든 할 일 목록을 가져오는 함수
export const fetchTodos = async (): Promise<Todo[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${TENANT_ID}/items`);
    if (!response.ok) {
      throw new Error("Failed to fetch todos");
    }
    return response.json();
  } catch (error) {
    console.error(error);
    return []; // 에러 발생 시 빈 배열 반환
  }
};

// 새로운 할 일을 생성하는 함수
export const createTodo = async (text: string): Promise<Todo> => {
  const response = await fetch(`${API_BASE_URL}/${TENANT_ID}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: text }), // API 명세에 따라 name으로 보냅니다.
  });

  if (!response.ok) {
    throw new Error("Failed to create todo");
  }
  return response.json();
};

// 할 일의 상태를 수정하는 함수 (PATCH)
export const updateTodo = async (
  id: number,
  updatedData: Partial<Todo>
): Promise<Todo> => {
  const response = await fetch(`${API_BASE_URL}/${TENANT_ID}/items/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    throw new Error("Failed to update todo");
  }
  return response.json();
};

// 특정 ID의 할 일 하나를 가져오는 함수 (GET)
export const getTodoById = async (id: number): Promise<Todo | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${TENANT_ID}/items/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch todo item");
    }
    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

// 특정 ID의 할 일을 삭제하는 함수 (DELETE)
export const deleteTodo = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/${TENANT_ID}/items/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete todo");
  }
};

// 이미지를 서버에 업로드하는 함수 (POST with FormData)
export const uploadImage = async (
  imageFile: File
): Promise<{ url: string }> => {
  const formData = new FormData();
  formData.append("image", imageFile); // 'image'라는 키로 파일 추가

  const response = await fetch(`${API_BASE_URL}/${TENANT_ID}/images/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Image upload failed");
  }
  return response.json();
};
