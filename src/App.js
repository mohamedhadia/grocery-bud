import { useEffect, useState } from "react";
import Alert from "./Alert";
import List from "./List";

function App() {
  const getLocalStorage = () => {
    let list = localStorage.getItem("list");
    if (list) {
      return JSON.parse(localStorage.getItem("list"));
    } else {
      return [];
    }
  };

  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const handlesubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "danger", "please enter value");
    } else if (name && isEditing) {
      // deal with edit
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "success", "value changed");
    } else {
      showAlert(true, "success", "item added to the list");
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const clearList = () => {
    showAlert(true, "danger", "all items has been deleted");
    setList([]);
  };

  const removeItem = (id) => {
    showAlert(true, "danger", "item removed");
    setList(list.filter((item) => item.id !== id));
  };
  const editeItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <div className="bg-blue-300 h-screen flex justify-center  items-center ">
      <div className="bg-blue50 shadow-2xl bg-white w-2/3 flex flex-col justify-center items-center rounded p-8">
        <form onSubmit={handlesubmit} className="w-2/3">
          {alert.show && (
            <Alert {...alert} removeAlert={showAlert} list={list} />
          )}
          <h3 className="text-2xl font-bold tracking-wide text-center mb-5">
            Grocery Bud
          </h3>
          <div className="flex gap-1">
            <input
              type="text"
              placeholder="e.g eggs"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-lg border-none bg-blue-200 w-3/4"
            />

            <button
              type="submit"
              className="bg-blue-200  py-2 rounded-lg border-none w-1/4 "
            >
              {isEditing ? "edit" : "Add"}
            </button>
          </div>
        </form>
        {list.length > 0 && (
          <div className="w-2/3">
            <List items={list} removeItem={removeItem} editItem={editeItem} />
            <button
              onClick={clearList}
              className="items-center mx-auto flex text-red-500 font-semibold tracking-wider bg-red-100 px-4 py-2 rounded-lg mt-5"
            >
              clear list
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
