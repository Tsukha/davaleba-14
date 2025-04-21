import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onToggle, onDelete, buttonLabel }) => {
  if (tasks.length === 0) {
    return <p className="empty-list">No tasks here!</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          buttonLabel={buttonLabel}
        />
      ))}
    </ul>
  );
};

export default React.memo(TaskList);
