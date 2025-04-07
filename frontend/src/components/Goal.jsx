import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Goal = ({ item, index, setData }) => {
  const [goalValue, setGoalValue] = useState(item.text);
  const [isDeleting, setIsDeleting] = useState(false);

  const getHandler = () => {
    axios
      // .get("http://localhost:5000/api/goals")
      .get("https://goal-setter-app-mocha.vercel.app/api/goals")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editHandler = (id, text) => {
    axios
      // .post("http://localhost:5000/api/goals", {
      .put(`https://goal-setter-app-mocha.vercel.app/api/goals/${id}`, {
        text: text,
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
      .then(() => {
        getHandler();
      });
  };
  return (
    <li
      key={item["_id"]}
      className="goal relative border-2 border-cyan-900 rounded-xl p-1 grid grid-cols-[3.2rem_1fr_2.2rem] justify-center items-center bg-cyan-950 hover:drop-shadow-[0_0_6px_rgba(21,94,117,0.6)] hover:brightness-125 hover:border-cyan-700 "
    >
      <div className="text-xl border-cyan-900 border-2 rounded-full flex items-center justify-center size-8 aspect-square mx-2 ">
        {index + 1}
      </div>
      <div className="w-full">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.target.children[0].blur();
            editHandler(item["_id"], e.target.text.value);
          }}
        >
          <input
            onChange={(e) => setGoalValue(e.target.value)}
            onBlur={(e) => editHandler(item["_id"], e.target.value)}
            className="bg-transparent text-xl focus:outline-none focus:bg-cyan-900 placeholder:text-white w-full cursor-pointer"
            value={goalValue}
            type="text"
            name="text"
            id={item.id}
          />
        </form>

        <div className="opacity-50 text-sm border-t mt-1 max-[330px]:text-xs flex justify-between max-[410px]:flex-col">
          <p>Created: {item.createdAt.slice(0, 10)}</p>
          {item.createdAt.slice(0, 10) !== item.updatedAt.slice(0, 10) && (
            <p>Updated: {item.updatedAt.slice(0, 10)}</p>
          )}
          {/* /{" "} */}
          {/* {item.createdAt.slice(11, 19)} */}
        </div>
      </div>
      <button
        title="delete"
        className="size-8 ml-1 grid place-items-center hover:text-red-700 transition-colors"
        onClick={() => {
          deleteHandler(item["_id"]);
          setIsDeleting(true);
        }}
      >
        {!isDeleting ? (
          <FaTrashAlt />
        ) : (
          <AiOutlineLoading3Quarters className="animate-spin" />
        )}
      </button>
    </li>
  );
};

export default Goal;
