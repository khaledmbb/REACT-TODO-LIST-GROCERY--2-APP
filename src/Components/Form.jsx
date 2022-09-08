import React from "react";

const Form = ({
  submitInput,
  taskTitle,
  handleSubmit,
  handleChange,
  isEditing,
}) => {
  return (
    <form className="setTasks" onSubmit={handleSubmit}>
      <input
        ref={submitInput}
        type="text"
        onChange={(e) => handleChange(e.target.value)}
        value={taskTitle}
        placeholder="e.g. eggs"
      />
      <input type="submit" value={isEditing ? "Edit" : "Add Grocery"} />
    </form>
  );
};

export default Form;
