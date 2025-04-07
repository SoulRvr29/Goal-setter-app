import { useState, useEffect } from "react";
import axios from "axios";
import Goal from "./components/Goal";
import { IoIosAddCircle } from "react-icons/io";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function App() {
  const [data, setData] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  const getHandler = () => {
    axios
      // .get("http://localhost:5000/api/goals")
      .get("https://goal-setter-app-mocha.vercel.app/api/goals")
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
        setIsAdding(false);
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
      .then(() => {
        getHandler();
        setShowInput(false);
        setInputText("");
      });
  };

  useEffect(() => {
    getHandler();
  }, []);

  return (
    <div className="w-screen flex flex-col items-center justify-between min-h-screen ">
      <main className=" border-gray-600 w-screen max-w-md">
        {/* HEADER */}
        <h1 className="text-4xl p-1 text-center text-cyan-500 font-bold border-b-2 border-b-cyan-800">
          Goal Setter
        </h1>
        <p className="text-cyan-800 text-center">MERN stack app</p>
        {/* GOALS */}
        <ul className="flex flex-col gap-4 px-4 mt-4">
          {data.length > 0 ? (
            data.map((item, index) => (
              <Goal
                item={item}
                key={item["_id"]}
                index={index}
                setData={setData}
              />
            ))
          ) : isLoading ? (
            <p className="text-center text-xl m-2 animate-bounce">Loading...</p>
          ) : (
            <p className="text-center text-xl m-2">No goals</p>
          )}
          {!showInput ? (
            <button
              className="bg-cyan-900 rounded-xl px-2 py-2 uppercase font-semibold hover:bg-cyan-500 hover:text-cyan-950"
              onClick={() => setShowInput(!showInput)}
            >
              add new
            </button>
          ) : (
            <form className="border-2 border-cyan-900 rounded-xl p-1 flex items-center bg-cyan-200 bg-opacity-70 hover:drop-shadow-[0_0_6px_rgba(21,94,117,0.6)] ">
              <input
                className="new-goal bg-transparent text-black font-semibold placeholder:text-zinc-700 w-full mr-1 outline-none"
                type="text"
                name="text-input"
                id="text-input"
                placeholder="New goal"
                onChange={(e) => setInputText(e.target.value)}
                onFocus={(e) => (e.target.value = "")}
                autoFocus
              />
              <button
                type="submit"
                title="add new goal"
                className="text-cyan-900 text-3xl hover:brightness-125"
                onClick={(e) => {
                  e.preventDefault();
                  postHandler(inputText);
                  inputText && setIsAdding(true);
                }}
              >
                {isAdding ? (
                  <AiOutlineLoading3Quarters
                    size={22}
                    className="animate-spin m-1"
                  />
                ) : (
                  <IoIosAddCircle />
                )}
              </button>
            </form>
          )}
        </ul>
      </main>
      {/* FOOTER */}
      <footer className="text-center mt-4 border-t border-cyan-900 w-full mx-auto text-gray-500 p-1 font-medium">
        Created by Paweł Chudecki &copy; 2024
      </footer>
    </div>
  );
}

export default App;
