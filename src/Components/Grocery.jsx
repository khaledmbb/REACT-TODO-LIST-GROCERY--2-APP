import { VscTrash } from "react-icons/vsc";
import { TbEdit } from "react-icons/tb";
import { MdOutlineRemoveDone, MdOutlineDone } from "react-icons/md";
const Grocery = ({
  taskList,
  clearAll,
  handleDone,
  handleDelete,
  handleEdit,
}) => {
  return (
    <div className="grocery">
      <ul className="info">
        {taskList.map(({ status, title }, idx) => (
          <li className="info-li" key={idx} id={idx}>
            <div
              className="task-title"
              style={status ? {} : { textDecoration: "line-through" }}
            >
              <span>{idx + 1}</span> {title}
            </div>
            <div className="icons">
              <ul className="second-info">
                <li onClick={() => handleDone(idx + 1)}>
                  {status ? (
                    <MdOutlineDone className="done" />
                  ) : (
                    <MdOutlineRemoveDone />
                  )}
                </li>

                {status && (
                  <li className="edit" onClick={() => handleEdit(idx + 1)}>
                    {<TbEdit />}
                  </li>
                )}
                <li className="delete" onClick={() => handleDelete(idx + 1)}>
                  {<VscTrash />}
                </li>
              </ul>
            </div>
          </li>
        ))}
      </ul>
      {taskList.length ? (
        <button type="button" className="clear-all" onClick={clearAll}>
          Clear All
        </button>
      ) : null}
    </div>
  );
};

export default Grocery;
