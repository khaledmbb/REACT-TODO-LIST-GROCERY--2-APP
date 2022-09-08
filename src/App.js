import { useEffect, useRef, useState } from "react";
import Form from "./Components/Form";
import Grocery from "./Components/Grocery";
import Alert from "./Components/Alert";
import getItemsFromStorage from "./Components/storage";

const App = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskList, setTaskList] = useState(getItemsFromStorage("itemsList"));
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({});
  const submitInput = useRef();
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!taskTitle) {
      setAlert({ status: false, title: "Enter A valid Item" });
    } else if (taskTitle && isEditing) {
      setTaskList(
        taskList.map((el, idx) => {
          if (idx + 1 === editId) {
            return { ...el, title: taskTitle };
          }
          return el;
        })
      );
      setIsEditing(false);
      setEditId(null);
      setTaskTitle("");
      setAlert({ status: true, title: "Item Edited" });
    } else {
      setTaskList([...taskList, { status: true, title: taskTitle }]);
      setAlert({ status: true, title: "Item Added" });
      setTaskTitle("");
    }
  };

  const handleChange = (text) => {
    setTaskTitle(text);
  };
  const clearAll = () => {
    setTaskList([]);
    setAlert({ status: false, title: "Items Deleted" });
  };

  const handleDone = (idx) => {
    setTaskList(
      taskList.map((el, index) => {
        if (index + 1 === idx) {
          if (index + 1 === idx && el.status) {
            setAlert({ status: true, title: "Item is Done" });
          } else {
            setAlert({ status: false, title: "Item is Not Done" });
          }
          console.log(el.status);
          return { ...el, status: !el.status };
        }
        return el;
      })
    );
  };

  const handleDelete = (idx) => {
    setTaskList(taskList.filter((el, index) => index + 1 !== idx));
    setAlert({ status: false, title: "Item Deleted" });
  };

  const handleEdit = (idx) => {
    setEditId(idx);
    const specialTitle = taskList.find((item, id) => id + 1 === idx);
    setIsEditing(true);
    setTaskTitle(specialTitle.title);
    submitInput.current.focus();
  };

  useEffect(() => {
    localStorage.setItem("itemsList", JSON.stringify(taskList));
  }, [taskList]);

  return (
    <div className="App">
      <div className="container">
        <h1 className="title">
          <span>/</span> Grocery Bud <span>/</span>
        </h1>
        {Object.keys(alert).length === 0 ? null : (
          <Alert alert={alert} setAlert={setAlert} taskList={taskList} />
        )}
        <Form
          submitInput={submitInput}
          taskTitle={taskTitle}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          isEditing={isEditing}
        />
        {taskList.length ? (
          <Grocery
            taskList={taskList}
            handleDone={handleDone}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            clearAll={clearAll}
          />
        ) : (
          <h2>No Items Here</h2>
        )}
      </div>
    </div>
  );
};

export default App;
