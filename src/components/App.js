import React, {useState, useRef} from "react";
import Task from "./task";
import "./../styles/App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const taskId = useRef(0);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleClick = () => {
    const updatedTasks = [...tasks];
    updatedTasks.push({id: taskId.current, text: inputValue});
    taskId.current = taskId.current + 1;
    setInputValue("");
    setTasks(updatedTasks);
  };

  const handleDelete = (id) => {
    const taskCopy = [...tasks];
    const filteredTasks = taskCopy.filter((task) => (task.id !== id ? task : null));
    setTasks(filteredTasks);
  };

  const saveChangedText = (id, newtext) => {
    const taskCopy = [...tasks];
    taskCopy.forEach((task) => {
      if (task.id === id) {
        task.text = newtext;
      }
    });
    setTasks(taskCopy);
  };

  return (
    <div id="main">
      <ul>
        {tasks.map((task) => (
          <Task key={task.id} task={task} saveChangedText={saveChangedText} handleDelete={handleDelete} />
        ))}
      </ul>

      <input id="task" type="textarea" value={inputValue} onChange={handleChange}></input>
      <button id="btn" onClick={handleClick} disabled={!inputValue}>
        Add Task
      </button>
    </div>
  );
}

export default App;
