import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

const getStargazers = async (repository, page) => {
  const url = `https://api.github.com/repos/${repository}/stargazers?page=${page}`;

  const result = await axios(url);

  console.log("result", result);
  console.log(result.data[0]);
  return result.data;
};

function App() {
  const [repository, setRepository] = useState("facebook/react");
  const [stargazers, setStargazers] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);

  const fetchStargazers = async () => {
    if (repository === "") {
      return;
    }

    const result = await getStargazers(repository, 1);
    setStargazers(result);
    setPageIndex(1);
  };

  const fetchNextStargazers = async () => {
    if (repository === "") {
      return;
    }
    const result = await getStargazers(repository, pageIndex + 1);
    setStargazers(stargazers.concat(result));
    setPageIndex(pageIndex + 1);
  };

  useEffect(() => {
    fetchStargazers();
  }, [repository]);

  return (
    <div className="app">
      <div className="app-header">
        <span>Stargazers</span>
      </div>
      <div className="app-repository">
        <span style={{ marginRight: "10px" }}>Repository:</span>
        <input
          type="text"
          value={repository}
          onChange={(event) => {
            setRepository(event.target.value);
          }}
        ></input>
        <span style={{ marginLeft: "10px" }}>{stargazers.length} loaded!</span>
      </div>
      <div className="app-stargazers">
        {stargazers.map((d) => (
          <div key={d.node_id} className="app-stargazer">
            <img src={d.avatar_url} className="app-avatar" />
            <span>{d.login}</span>
          </div>
        ))}
      </div>
      <button
        style={{ marginTop: "20px", marginBottom: "20px" }}
        onClick={() => {
          fetchNextStargazers();
        }}
      >
        Load more
      </button>
    </div>
  );
}

export default App;
