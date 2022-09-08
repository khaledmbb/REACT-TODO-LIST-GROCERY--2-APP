import { useEffect } from "react";

const Alert = ({ alert, setAlert }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert({});
    }, 2000);
    return () => clearTimeout(timer);
  });
  return (
    <div className={alert.status ? "green" : "red"}>
      <p>{alert.title}</p>
    </div>
  );
};

export default Alert;
