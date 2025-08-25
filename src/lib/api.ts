// src/lib/api.ts
import { Todo } from "@/types/todo";

const API_BASE_URL = "https://assignment-todolist-api.vercel.app/api";
const TENANT_ID = "Chaeho";

/**
 * 모든 할 일 목록을 서버에서 가져옵니다. (GET /items)
 * Promise<Todo[]> - 할 일 목록 배열을 담은 Promise
 */
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

/**
 * 새로운 할 일을 서버에 생성합니다. (POST /items)
 * (text: string) - 생성할 할 일의 내용
 * Promise<Todo> - 서버에서 생성된 할 일 객체를 담은 Promise
 */
export const createTodo = async (text: string): Promise<Todo> => {
  const response = await fetch(`${API_BASE_URL}/${TENANT_ID}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: text }),
  });

  if (!response.ok) {
    throw new Error("Failed to create todo");
  }
  return response.json();
};

/**
 * 기존 할 일의 내용을 서버에서 수정합니다. (PATCH /items/{itemId})
 * id: number - 수정할 할 일의 ID
 * updatedData: Partial<Todo> - 수정할 내용을 담은 객체
 * Promise<Todo> - 서버에서 수정된 할 일 객체를 담은 Promise
 */
export const updateTodo = async (
  id: number,
  updatedData: Partial<Todo>
): Promise<Todo> => {
  // 전송할 데이터를 복사해서 새로운 payload 객체를 만듭니다.
  const payload = { ...updatedData };

  // 만약 imageUrl이 null이라면, API 명세에 맞게 빈 문자열("")로 값을 변경해줍니다.
  if (payload.imageUrl === null) {
    payload.imageUrl = "";
  }

  const response = await fetch(`${API_BASE_URL}/${TENANT_ID}/items/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to update todo");
  }
  return response.json();
};

/**
 * 특정 ID의 할 일 하나를 서버에서 가져옵니다. (GET /items/{itemId})
 * id: number - 조회할 할 일의 ID
 * Promise<Todo | null> - 할 일 객체 또는 에러 발생 시 null을 담은 Promise
 */
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

/**
 * 특정 ID의 할 일을 서버에서 삭제합니다. (DELETE /items/{itemId})
 * id: number - 삭제할 할 일의 ID
 */
export const deleteTodo = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/${TENANT_ID}/items/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete todo");
  }
};

/**
 * 이미지 파일을 서버에 업로드합니다. (POST /images/upload)
 * imageFile: File - 업로드할 이미지 파일
 * Promise<{ url: string }> 업로드된 이미지의 URL을 담은 객체의 Promise
 */
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
