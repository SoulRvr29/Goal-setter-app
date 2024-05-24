import { useState, useEffect } from "react";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";

function App() {
  const [data, setData] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [inputText, setInputText] = useState("");

  const getHandler = () => {
    axios
      // .get("http://localhost:5000/api/goals")
      .get("https://goal-setter-app-mocha.vercel.app/api/goals")
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const postHandler = (text) => {
    axios
      // .post("http://localhost:5000/api/goals", {
      .post("https://goal-setter-app-mocha.vercel.app/api/goals", {
        text: text,
      })

      .then((response) => {
        console.log(response.data);
      })
      .then(() => {
        getHandler();
        // setShowInput(false);
      });
  };

  const deleteHandler = (id) => {
    axios
      // .delete(`http://localhost:5000/api/goals/${id}`)
      .delete(`https://goal-setter-app-mocha.vercel.app/api/goals/${id}`)
      .then((response) => {
        console.log(response.data);
      })
      .then(() => {
        getHandler();
      });
  };

  // getHandler();
  return (
    <div className="w-screen flex flex-col items-center justify-between min-h-screen ">
      <main className=" border-gray-600 w-screen max-w-md">
        <h1 className="text-4xl p-1 text-center text-cyan-500 font-bold border-b-2 border-b-cyan-800">
          Goal Setter
        </h1>
        <nav className="flex justify-center gap-4 m-4">
          <button
            className="bg-cyan-900 rounded-md px-2 py-1 uppercase font-semibold hover:bg-cyan-500 hover:text-cyan-950"
            onClick={getHandler}
          >
            download list{" "}
          </button>
          <button
            className="bg-cyan-900 rounded-md px-2 py-1 uppercase font-semibold hover:bg-cyan-500 hover:text-cyan-950"
            onClick={() => setShowInput(!showInput)}
          >
            open input
          </button>
        </nav>
        <ul className="flex flex-col gap-4 px-4">
          {showInput && (
            <form className="border-2 border-cyan-900 rounded-xl p-1 flex items-center bg-cyan-200 bg-opacity-70 hover:drop-shadow-[0_0_6px_rgba(21,94,117,0.6)] ">
              <input
                className="bg-transparent text-black font-semibold placeholder:text-zinc-800 w-full mr-1 outline-none"
                type="text"
                name="text-input"
                id="text-input"
                placeholder="Add goal"
                onChange={(e) => setInputText(e.target.value)}
                onFocus={(e) => (e.target.value = "")}
              />
              <button
                type="submit"
                title="add new goal"
                className="text-cyan-900 text-3xl hover:brightness-125"
                onClick={(e) => {
                  e.preventDefault();
                  postHandler(inputText);
                }}
              >
                <IoIosAddCircle />
              </button>
            </form>
          )}
          {data.length > 0 &&
            data.map((item, index) => (
              <li
                key={item.id}
                className="relative border-2 border-cyan-900 rounded-xl p-1 flex items-center justify-start bg-cyan-950 hover:drop-shadow-[0_0_6px_rgba(21,94,117,0.6)] hover:brightness-125"
              >
                <div className="text-xl border-cyan-900 border-2 rounded-full size-10 grid items-center justify-center pb-[2px] mx-2 aspect-square">
                  {index + 1}
                </div>
                <div className="w-full mr-10">
                  <div className="text-xl">{item.text}</div>
                  <div className="opacity-50 text-sm border-t mt-1">
                    Date: {item.createdAt.slice(0, 10)} Time:{" "}
                    {item.createdAt.slice(11, 19)}
                  </div>
                </div>
                <button
                  title="delete"
                  className="mr-2 size-6 grid place-items-center absolute right-0 hover:text-red-700 transition-colors"
                  onClick={() => deleteHandler(item["_id"])}
                >
                  <FaTrashAlt />
                </button>
              </li>
            ))}
        </ul>
      </main>
      <footer className="text-center mt-4 border-t border-cyan-900 w-full mx-auto text-gray-500 p-1 font-medium">
        Paweł Chudecki &copy; 2024
      </footer>
    </div>
  );
}

export default App;
