//메인 페이지
"use client"; // useState를 사용하기 위해 파일 최상단에 추가합니다.

import { useState, useEffect, FormEvent } from "react";
import Header from "../components/Header";
import Input from "@/components/Input";
import Button from "@/components/Button";
import TodoListContainer from "@/components/TodoListContainer";
import { Todo } from "@/types/todo";
import { fetchTodos, createTodo, updateTodo } from "@/lib/api";

/**
 * 메인 페이지 컴포넌트
 * - 전체 할 일 목록을 보여주고, 새로운 할 일을 추가하는 기능을 담당합니다.
 */
export default function Home() {
  // 전체 할 일 목록 데이터를 저장하는 State
  const [todos, setTodos] = useState<Todo[]>([]);
  // 할 일 추가 입력창의 텍스트를 관리하는 State
  const [newTodoText, setNewTodoText] = useState("");

  /**
   * 컴포넌트가 처음 렌더링될 때 서버에서 할 일 목록을 불러옵니다.
   */
  useEffect(() => {
    const getTodos = async () => {
      const todosFromServer = await fetchTodos();
      if (Array.isArray(todosFromServer)) {
        setTodos(todosFromServer);
      } else {
        setTodos([]);
      }
    };
    getTodos();
  }, []);

  /**
   * '추가하기' 폼 제출 시 실행되는 함수.
   * 입력된 내용으로 새로운 할 일을 서버에 생성하고, 목록을 업데이트합니다.
   * {FormEvent} e - 폼 제출 이벤트 객체
   */
  const handleAddTodo = async (e: FormEvent) => {
    e.preventDefault();
    if (!newTodoText.trim()) return;

    try {
      const newTodo = await createTodo(newTodoText);
      setTodos([...todos, newTodo]);
      setNewTodoText("");
    } catch (error) {
      console.error("Failed to add todo:", error);
      alert("할 일 추가에 실패했습니다.");
    }
  };

  /**
   * 할 일 항목의 완료 상태를 변경(toggle)하는 함수.
   * 낙관적 업데이트를 적용하여 사용자 경험을 개선합니다.
   * {number} id - 상태를 변경할 할 일의 ID
   */
  const handleToggleTodo = async (id: number) => {
    const originalTodos = [...todos];
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    // UI를 먼저 업데이트
    setTodos(updatedTodos);

    try {
      // 서버에 변경된 상태를 전송
      const targetTodo = updatedTodos.find((todo) => todo.id === id);
      if (targetTodo) {
        await updateTodo(targetTodo.id, {
          isCompleted: targetTodo.isCompleted,
        });
      }
    } catch (error) {
      console.error("Failed to toggle todo:", error);
      alert("상태 변경에 실패했습니다.");
      // 에러 발생 시 원래 상태로 복구
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
