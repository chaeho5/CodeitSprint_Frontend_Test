"use client";

import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { getTodoById, updateTodo, deleteTodo } from "@/lib/api";
import { Todo } from "@/types/todo";
import TodoItem from "@/components/TodoItem";
import ImageUpload from "@/components/ImageUpload";
import Memo from "@/components/img/Memo";
import UpdateButton from "@/components/UpdateButton";
import DeleteButton from "@/components/DeleteButton";

export default function TodoDetailPage({
  params,
}: {
  params: { itemId: string };
}) {
  const router = useRouter();
  const [initialTodo, setInitialTodo] = useState<Todo | null>(null);

  // 👇 1. 폼 입력을 위한 state들을 추가합니다.
  const [name, setName] = useState("");
  const [memo, setMemo] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    const fetchTodo = async () => {
      const todoData = await getTodoById(Number(params.itemId));
      setInitialTodo(todoData);
      if (todoData) {
        setName(todoData.name);
        setMemo(todoData.memo || "");
        setIsCompleted(todoData.isCompleted);
        setImageUrl(todoData.imageUrl || null);
      }
    };
    fetchTodo();
  }, [params.itemId]);

  // 👇 2. 변경 여부를 감지하는 useEffect를 추가합니다.
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

  // 👇 3. 수정/삭제/상태변경 함수를 추가/수정합니다.
  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();

    // 1. 서버에 보낼 데이터 객체를 만듭니다. (imageUrl은 아직 미포함)
    const payload: Partial<Todo> = {
      name,
      memo,
      isCompleted,
    };

    // 2. imageUrl에 값이 있을 경우에만 payload에 추가합니다.
    if (imageUrl) {
      payload.imageUrl = imageUrl;
    }

    try {
      // 3. 완성된 payload를 서버에 전송합니다.
      await updateTodo(Number(params.itemId), payload);
      alert("수정이 완료되었습니다.");
      router.push("/");
    } catch (error) {
      console.error("Failed to update todo:", error);
      alert("수정에 실패했습니다.");
    }
  };

  const handleDelete = async () => {
    if (confirm("정말로 이 할 일을 삭제하시겠습니까?")) {
      try {
        await deleteTodo(Number(params.itemId));
        alert("삭제가 완료되었습니다.");
        router.push("/");
      } catch (error) {
        console.error("Failed to delete todo:", error);
        alert("삭제에 실패했습니다.");
      }
    }
  };

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
          {/* 👇 4. 폼과 버튼들을 렌더링합니다. */}
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

              {/* 👇 Memo를 감싸는 div를 추가하고 너비를 2/3로 지정합니다. */}
              <div className="md:w-[55%]">
                <Memo value={memo} onChange={(e) => setMemo(e.target.value)} />
              </div>
            </div>
            <div className="mt-8 flex justify-center md:justify-end gap-4">
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
