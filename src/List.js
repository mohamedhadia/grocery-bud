import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const List = ({ items, removeItem, editItem }) => {
  return (
    <div>
      {items.map((item) => {
        const { id, title } = item;
        return (
          <div
            className="flex flex-row justify-between w-full relative  mt-2 hover:bg-blue-100 rounded p-2"
            key={id}
          >
            <p className="break-all mr-2">{title}</p>
            <div className="flex flex-row">
              <button
                type="button"
                className=" mr-2"
                onClick={() => editItem(id)}
              >
                <FaEdit className="text-green-800" />
              </button>
              <button
                type="button "
                className=""
                onClick={() => removeItem(id)}
              >
                <FaTrash className="text-red-500" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default List;
