import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const taskFormRef = useRef();

  useEffect(() => {
    focusFormInput();
  }, []);

  const focusFormInput = useCallback(() => {
    if (taskFormRef.current) {
      taskFormRef.current.focus();
    }
  }, []);

  const addTask = useCallback((text) => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  }, []);

  const toggleTaskStatus = useCallback((id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    focusFormInput();
  }, []);

  const deleteTask = useCallback((id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    focusFormInput();
  }, []);

  const unfinishedTasks = useMemo(
    () => tasks.filter((task) => !task.completed),
    [tasks]
  );

  const finishedTasks = useMemo(
    () => tasks.filter((task) => task.completed),
    [tasks]
  );

  return (
    <div className="app-container">
      <h1>Task Manager</h1>
      <TaskForm ref={taskFormRef} onAddTask={addTask} />
      <div className="tasks-container">
        <div className="column">
          <h2>Tasks To Do</h2>
          <TaskList
            tasks={unfinishedTasks}
            onToggle={toggleTaskStatus}
            onDelete={deleteTask}
            buttonLabel="Done"
          />
        </div>
        <div className="column">
          <h2>Completed Tasks</h2>
          <TaskList
            tasks={finishedTasks}
            onToggle={toggleTaskStatus}
            onDelete={deleteTask}
            buttonLabel="Undo"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
