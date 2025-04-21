import React, { useCallback } from "react";

const TaskItem = ({ task, onToggle, onDelete, buttonLabel }) => {
  const handleToggle = useCallback(() => {
    onToggle(task.id);
  }, [onToggle, task.id]);

  const handleDelete = useCallback(() => {
    onDelete(task.id);
  }, [onDelete, task.id]);

  return (
    <li className="task-item">
      <span className={task.completed ? "completed" : ""}>{task.text}</span>
      <div className="task-buttons">
        <button
          onClick={handleToggle}
          className={task.completed ? "undo-button" : "done-button"}
        >
          {buttonLabel}
        </button>
        <button onClick={handleDelete} className="remove-button">
          Delete
        </button>
      </div>
    </li>
  );
};

export default React.memo(TaskItem);
