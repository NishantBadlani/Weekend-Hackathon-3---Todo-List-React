import React, {useState, useRef} from "react";
import "./../styles/App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [editText, setEditText] = useState("");
  const taskId = useRef(0);
  const editId = useRef(null);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleClick = () => {
    const updatedTasks = [...tasks];
    updatedTasks.push({id: taskId.current, text: inputValue});
    taskId.current = taskId.current + 1;
    console.log(taskId.current);
    setInputValue("");
    setTasks(updatedTasks);
  };

  const handleDelete = (id) => {
    const taskCopy = [...tasks];
    const filteredTasks = taskCopy.filter((task) => (task.id !== id ? task : null));
    setTasks(filteredTasks);
  };

  const handleEdit = (id) => {
    setShowEdit(true);
    editId.current = id;
  };

  const handleTextChange = (event) => {
    setEditText(event.target.value);
  };

  const saveChangedText = () => {
    const taskCopy = [...tasks];
    taskCopy.forEach((task) => {
      if (task.id === editId.current) {
        task.text = editText;
      }
    });
    setTasks(taskCopy);
    setShowEdit(false);
    setEditText("");
  };

  return (
    <div id="main">
      <ul>
        {tasks.map((task) => {
          return (
            <li className="list" key={task.id}>
              {task.text}
              <button className="edit" onClick={() => handleEdit(task.id)}>
                Edit
              </button>
              <button className="delete" onClick={() => handleDelete(task.id)}>
                Delete
              </button>
            </li>
          );
        })}
      </ul>

      {showEdit ? (
        <div>
          <input type="texarea" className="editTask" onChange={handleTextChange}></input>
          <button className="saveTask" disabled={!editText} onClick={saveChangedText}>
            Save
          </button>
        </div>
      ) : null}

      <input id="task" type="textarea" value={inputValue} onChange={handleChange}></input>
      <button id="btn" onClick={handleClick}>
        Add Task
      </button>
    </div>
  );
}

export default App;
