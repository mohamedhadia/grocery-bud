import React, { useEffect } from "react";

const Alert = ({ msg, type, removeAlert, list }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list]);

  return (
    <div>
      <h4
        className={`${
          type === "success" ? "bg-green-200" : "bg-red-200"
        } p-1 rounded text-center`}
      >
        {msg}
      </h4>
    </div>
  );
};

export default Alert;
