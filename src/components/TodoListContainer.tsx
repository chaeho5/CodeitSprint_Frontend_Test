import TodoItem from "./TodoItem";
import EmptyState from "./EmptyState";
import { Todo } from "@/types/todo";
import localFont from "next/font/local";

// TO DO 와 DONE 배지에 사용될 커스텀 폰트를 정의합니다.
const HSSantokki = localFont({
  src: "../fonts/HSSantokki.woff2",
});

// TodoListContainer 컴포넌트가 받을 props 타입을 정의합니다.
interface TodoListContainerProps {
  todos: Todo[]; // 표시할 전테 할 일 목록 배열
  onToggle: (id: number) => void; // 할 일의 완료 상태를 변경하는 함수
}

/**
 * 'TO DO'와 'DONE' 두 섹션으로 나누어 할 일 목록을 표시하는 컨테이너 컴포넌트입니다.
 * 목록이 비어있을 경우 EmptyState 컴포넌트를 대신 표시합니다.
 */
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
    <section className="mt-8 w-full grid grid-cols-1 gap-8 md:grid-cols-2">
      {/* TO DO */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <span
            className={`inline-block rounded-[23px] bg-lime-300 px-[27px] py-[7px] text-base font-bold text-green-700 ${HSSantokki.className}`}
          >
            TO DO
          </span>
        </div>
        <div className="flex flex-col gap-3">
          {/* todoItems 배열에 항목이 있으면 목록을, 없으면 EmptyState를 표시합니다. */}
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

      {/* DONE */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <span
            className={`inline-block rounded-[23px] bg-green-700 px-[27px] py-[7px] text-base font-bold text-amber-300 ${HSSantokki.className}`}
          >
            DONE
          </span>
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
