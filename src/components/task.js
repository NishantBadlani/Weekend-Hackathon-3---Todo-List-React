import React, {useState} from "react";

export default function Task(props) {
  const {task, saveChangedText, handleDelete} = props;

  const [showEdit, setShowEdit] = useState(false);
  const [editText, setEditText] = useState("");

  const handleEdit = (id) => {
    setShowEdit(!showEdit);
  };

  const handleTextChange = (event) => {
    setEditText(event.target.value);
  };

  const saveNewText = (id) => {
    saveChangedText(id, editText);
    setShowEdit(false);
    setEditText("");
  };

  return (
    <div>
      <li className="list">
        {task.text}
      </li>
      <button className="edit" onClick={() => handleEdit(task.id)}>
        Edit
      </button>
      <button className="delete" onClick={() => handleDelete(task.id)}>
        Delete
      </button>
      {showEdit ? (
        <div>
          <input type="texarea" className="editTask" onChange={handleTextChange}></input>
          <button className="saveTask" disabled={!editText} onClick={() => saveNewText(task.id)}>
            Save
          </button>
        </div>
      ) : null}
    </div>
  );
}
