// src/app/items/[itemId]/page.tsx

"use client";

import { useEffect, useState, FormEvent, use } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { getTodoById, updateTodo, deleteTodo } from "@/lib/api";
import { Todo } from "@/types/todo";
import TodoItem from "@/components/TodoItem";
import ImageUpload from "@/components/ImageUpload";
import Memo from "@/components/img/Memo";
import UpdateButton from "@/components/UpdateButton";
import DeleteButton from "@/components/DeleteButton";

// 1. props의 타입을 Promise로 감싸고, use 훅으로 풀어줍니다.
export default function Page({ params: paramsPromise }: { params: Promise<{ itemId: string }> }) {
  const params = use(paramsPromise);
  const { itemId } = params; // 이제 itemId를 안전하게 사용할 수 있습니다.

  const router = useRouter();
  const [initialTodo, setInitialTodo] = useState<Todo | null>(null);

  // 폼 입력을 위한 state들
  const [name, setName] = useState("");
  const [memo, setMemo] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    const fetchTodo = async () => {
      // 풀어준 itemId 값을 사용합니다.
      const todoData = await getTodoById(Number(itemId));
      setInitialTodo(todoData);
      if (todoData) {
        setName(todoData.name);
        setMemo(todoData.memo || "");
        setIsCompleted(todoData.isCompleted);
        setImageUrl(todoData.imageUrl || null);
      }
    };
    fetchTodo();
  }, [itemId]); // 의존성 배열에도 itemId를 넣어줍니다.

  // 변경 여부를 감지하는 useEffect
  useEffect(() => {
    if (!initialTodo) return;
    if (
      initialTodo.name !== name ||
      (initialTodo.memo || "") !== memo ||
      initialTodo.isCompleted !== isCompleted ||
      (initialTodo.imageUrl || null) !== imageUrl
    ) {
      setIsModified(true);
    } else {
      setIsModified(false);
    }
  }, [name, memo, isCompleted, imageUrl, initialTodo]);

  // 수정 함수 (이미지 삭제 로직 수정 반영)
  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();

    // imageUrl을 항상 payload에 포함시켜 null 값도 서버로 전달되게 합니다.
    const payload: Partial<Todo> = {
      name,
      memo,
      isCompleted,
      imageUrl,
    };

    try {
      await updateTodo(Number(itemId), payload);
      alert("수정이 완료되었습니다.");
      router.push("/");
    } catch (error) {
      console.error("Failed to update todo:", error);
      alert("수정에 실패했습니다.");
    }
  };

  // 삭제 함수
  const handleDelete = async () => {
    if (confirm("정말로 이 할 일을 삭제하시겠습니까?")) {
      try {
        await deleteTodo(Number(itemId));
        alert("삭제가 완료되었습니다.");
        router.push("/");
      } catch (error) {
        console.error("Failed to delete todo:", error);
        alert("삭제에 실패했습니다.");
      }
    }
  };

  // 상태 변경 함수
  const handleToggleStatus = () => {
    setIsCompleted(!isCompleted);
  };

  if (!initialTodo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="sticky flex h-[60px] w-full">
        <Header />
      </header>

      <main className="flex flex-1 items-center justify-center">
        <div className="h-[1020px] w-[1000px] bg-white p-8 shadow-lg">
          <TodoItem
            id={initialTodo.id}
            name={name}
            isCompleted={isCompleted}
            onToggle={handleToggleStatus}
            align="center"
            Underline={true}
            isEditable={true}
            onNameChange={setName}
          />
          <form onSubmit={handleUpdate} className="mt-8">
            <div className="flex flex-col gap-8 md:flex-row">
              <div className="md:w-[45%]">
                <ImageUpload imageUrl={imageUrl} onImageUpload={setImageUrl} />
              </div>
              <div className="md:w-[55%]">
                <Memo value={memo} onChange={(e) => setMemo(e.target.value)} />
              </div>
            </div>
            <div className="mt-8 flex justify-center gap-4 md:justify-end">
              <UpdateButton
                type="submit"
                isActive={isModified}
                disabled={!isModified}
              />
              <DeleteButton onClick={handleDelete} />
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}