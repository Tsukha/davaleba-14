import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";

const TaskForm = forwardRef((props, ref) => {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    },
  }));

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (input === "" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [input]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      props.onAddTask(input);
      setInput("");
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        ref={inputRef}
        value={input}
        onChange={handleInputChange}
        placeholder="Add a new task..."
        className="task-input"
      />
      <button type="submit" className="add-button">
        Add Task
      </button>
    </form>
  );
});

export default React.memo(TaskForm);
