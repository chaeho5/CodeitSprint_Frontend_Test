import TodoItem from "./TodoItem";
import EmptyState from "./EmptyState"; // 👈 EmptyState를 import 합니다.
import { Todo } from "@/types/todo";
import localFont from "next/font/local";

const HSSantokki = localFont({
  src: "../fonts/HSSantokki.woff2",
});

interface TodoListContainerProps {
  todos: Todo[];
  onToggle: (id: number) => void;
}

export default function TodoListContainer({
  todos = [],
  onToggle,
}: TodoListContainerProps) {
  const todoItems = todos.filter((todo) => !todo.isCompleted);
  const doneItems = todos.filter((todo) => todo.isCompleted);

  // EmptyState에 전달할 메시지
  const todoMessage = "할 일이 없어요.\nTODO를 새롭게 추가해주세요!";
  const doneMessage = "아직 다 한 일이 없어요.\n해야 할 일을 체크해보세요!";

  return (
    <section className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
      {/* TO DO Section */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <span
            className={`inline-block rounded-[23px] bg-lime-300 px-[27px] py-[7px] text-base font-bold text-green-700 ${HSSantokki.className}`}
          >
            TO DO
          </span>
        </div>
        <div className="flex flex-col gap-3">
          {todoItems.length > 0 ? (
            todoItems.map((item) => (
              <TodoItem
                key={item.id}
                id={item.id}
                name={item.name}
                isCompleted={item.isCompleted}
                onToggle={() => onToggle(item.id)}
              />
            ))
          ) : (
            <EmptyState imageSrc="/images/Todo.svg" message={todoMessage} />
          )}
        </div>
      </div>

      {/* DONE Section */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <span className={`inline-block rounded-[23px] bg-green-700 px-[27px] py-[7px] text-base font-bold text-amber-300 ${HSSantokki.className}`}>DONE</span>
        </div>
        <div className="flex flex-col gap-3">
          {doneItems.length > 0 ? (
            doneItems.map((item) => (
              <TodoItem
                key={item.id}
                id={item.id}
                name={item.name}
                isCompleted={item.isCompleted}
                onToggle={() => onToggle(item.id)}
              />
            ))
          ) : (
            <EmptyState imageSrc="/images/Done.svg" message={doneMessage} />
          )}
        </div>
      </div>
    </section>
  );
}
