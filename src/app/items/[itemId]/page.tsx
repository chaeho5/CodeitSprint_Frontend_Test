// src/app/items/[itemId]/page.tsx
// 수정 가능한 상세페이지

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

/**
 * 할 일 상세 페이지 컴포넌트
 * URL의 itemId를 기반으로 특정 할 일의 데이터를 불러와 표시합니다.
 * 할 일의 이름, 메모, 상태, 이미지 등을 수정하고 삭제할 수 있습니다.
 */

export default function Page({
  params: paramsPromise,
}: {
  params: Promise<{ itemId: string }>;
}) {
  const params = use(paramsPromise);
  const { itemId } = params;

  const router = useRouter();

  // --- 상태 관리 ---
  //API로 불러온 원본 할 일 데이터를 저장하는 State
  const [initialTodo, setInitialTodo] = useState<Todo | null>(null);

  //수정 중인 할 일의 이름을 관리하는 State
  const [name, setName] = useState("");

  //수정 중인 할 일의 메모를 관리하는 State
  const [memo, setMemo] = useState("");

  //수정 중인 할 일의 완료 여부(체크)를 관리하는 State
  const [isCompleted, setIsCompleted] = useState(false);

  //수정 중인 할일의 이미지 URL을 관리하는 State
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  //폼 내용의 수정 여부를 감지하는 State
  const [isModified, setIsModified] = useState(false);

  //데이터 로직
  /**
   * 컴포넌트 마운트 시 URL의 itemId를 이용해 할 일 데이터를 불러옵니다.
   * 불러온 데이터로 각 state를 초기화합니다.
   */
  useEffect(() => {
    const fetchTodo = async () => {
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
  }, [itemId]);

  /**
   * 폼의 내용이 변경될 때마다 원본 데이터와 비교하여 수정 여부(isModified)를 업데이트합니다.
   */
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

  //이벤트 핸들러
  /**
   * 수정 완료 버튼 클릭 또는 폼 제출 시 실행되는 함수
   * 변경된 내용을 서버에 저장하고 메인 페이지로 이동합니다.
   */
  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();

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

  /**
   * 삭제하기 버튼 클릭 시 실행되는 함수
   * 확인창을 띄운 후, 서버에서 할 일을 삭제하고 메인 페이지로 이동합니다.
   */
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

  /**
   * TodoItem의 체크박스 클릭 시 isCompleted 상태를 변경하는 함수.
   */
  const handleToggleStatus = () => {
    setIsCompleted(!isCompleted);
  };

  //수정 페이지로 넘어올 때 로딩 창
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
            <div className="flex flex-col gap-8 lg:flex-row">
              <div className="lg:w-[45%]">
                <ImageUpload imageUrl={imageUrl} onImageUpload={setImageUrl} />
              </div>
              <div className="lg:w-[55%]">
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
