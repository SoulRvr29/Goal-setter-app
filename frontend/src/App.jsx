import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);

  const getHandler = () => {
    axios
      .get("http://localhost:5000/api/goals")
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <h1>Goal setter app</h1>
      <nav>
        <button onClick={getHandler}>get</button>
      </nav>
      <ul className="goals-container">
        {data.length > 0 &&
          data.map((item, index) => (
            <li key={item.id} className="goal">
              <div className="goal-index">{index}</div>
              <div>
                <div className="goal-text">{item.text}</div>
                <div className="created-at">{item.createdAt}</div>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
}

export default App;
