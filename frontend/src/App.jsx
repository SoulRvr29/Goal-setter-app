import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [inputText, setInputText] = useState("");

  const getHandler = () => {
    axios
      .get("http://localhost:5000/api/goals")
      // .get("https://goal-setter-app-mocha.vercel.app/api/goals")
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
      .post("http://localhost:5000/api/goals", {
        text: text,
      })
      // .post("https://goal-setter-app-mocha.vercel.app/api/goals", {
      //    text: "test",
      //  })
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
      .delete(`http://localhost:5000/api/goals/${id}`)
      .then((response) => {
        console.log(response.data);
      })
      .then(() => {
        getHandler();
      });
  };

  return (
    <>
      <h1>Goal setter app</h1>
      <nav>
        <button onClick={getHandler}>get all</button>
        <button onClick={() => setShowInput(!showInput)}>add new</button>
      </nav>
      <ul className="goals-container">
        {showInput && (
          <div className="input-container">
            <input
              type="text"
              name="text-input"
              id="text-input"
              placeholder="Add goal"
              onChange={(e) => setInputText(e.target.value)}
              onFocus={(e) => (e.target.value = "")}
            />
            <button
              type="submit"
              className="ok-btn"
              onClick={() => postHandler(inputText)}
            >
              ok
            </button>
          </div>
        )}
        {data.length > 0 &&
          data.map((item, index) => (
            <li key={item.id} className="goal">
              <div className="goal-index">{index}</div>
              <div>
                <div className="goal-text">{item.text}</div>
                <div className="created-at">
                  Date: {item.createdAt.slice(0, 10)} Time:{" "}
                  {item.createdAt.slice(11, 19)}
                </div>
              </div>
              <button
                className="delete-btn"
                onClick={() => deleteHandler(item["_id"])}
              >
                x
              </button>
            </li>
          ))}
      </ul>
    </>
  );
}

export default App;
