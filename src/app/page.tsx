"use client"; // useState를 사용하기 위해 파일 최상단에 추가합니다.

import { useState, useEffect, FormEvent } from "react"; // useState를 import 합니다.
import Header from "../components/Header";
import Input from "@/components/Input";
import Button from "@/components/Button";
import TodoListContainer from "@/components/TodoListContainer";
import { Todo } from "@/types/todo"; // 정의한 타입을 import 합니다.
import { fetchTodos, createTodo, updateTodo } from "@/lib/api";

export default function Home() {
  // 1. 할 일 목록 데이터를 저장할 state
  const [todos, setTodos] = useState<Todo[]>([]);

  // 2. 입력창의 텍스트를 저장할 state
  const [newTodoText, setNewTodoText] = useState("");

  useEffect(() => {
    const getTodos = async () => {
      // 👇 fetchTodos는 이제 배열을 직접 반환합니다.
      const todosFromServer = await fetchTodos();
      // 👇 받아온 데이터가 배열인지 확인하고 상태를 업데이트합니다.
      if (Array.isArray(todosFromServer)) {
        setTodos(todosFromServer);
      } else {
        setTodos([]);
      }
    };
    getTodos();
  }, []);

  // 3. 할 일 추가 함수
  const handleAddTodo = async (e: FormEvent) => {
    e.preventDefault();
    if (!newTodoText.trim()) return;

    try {
      // 1. API를 호출하여 서버에 할 일을 생성합니다.
      const newTodo = await createTodo(newTodoText);
      // 2. 성공적으로 생성되면, 반환된 할 일을 현재 목록에 추가합니다.
      setTodos([...todos, newTodo]);
      setNewTodoText(""); // 입력창을 비웁니다.
    } catch (error) {
      console.error("Failed to add todo:", error);
      alert("할 일 추가에 실패했습니다.");
    }
  };

  // 4. 할 일 상태 변경 함수
  const handleToggleTodo = async (id: number) => {
    // 먼저 화면을 즉시 업데이트하여 사용자 경험을 좋게 합니다 (Optimistic Update).
    const originalTodos = [...todos];
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setTodos(updatedTodos);

    try {
      // 서버에 변경된 상태를 전송합니다.
      const targetTodo = updatedTodos.find((todo) => todo.id === id);
      if (targetTodo) {
        await updateTodo(targetTodo.id, {
          isCompleted: targetTodo.isCompleted,
        });
      }
    } catch (error) {
      console.error("Failed to toggle todo:", error);
      alert("상태 변경에 실패했습니다.");
      // 에러 발생 시 원래 상태로 되돌립니다.
      setTodos(originalTodos);
    }
  };
  return (
    <main className="min-h-screen w-full bg-slate-100">
      <Header />
      <div className="mx-auto max-w-screen-lg px-5">
        <form
          onSubmit={handleAddTodo}
          className="mt-8 flex items-center justify-between gap-4"
        >
          <Input
            placeholder="할 일을 입력해주세요"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
          />
          <Button type="submit" disabled={!newTodoText.trim()} />
        </form>

        <TodoListContainer todos={todos} onToggle={handleToggleTodo} />
      </div>
    </main>
  );
}
