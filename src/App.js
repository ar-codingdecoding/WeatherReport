import { useState } from "react";
import "./App.css";
import Weather from "./components/weather/Weather";

function App() {
  const [addList, setAddList] = useState(false);
  function AddMethod() {
    if (addList === false) setAddList(true);
    else setAddList(false);
  }

  return (
    <div className="App">
      <Weather />
      {addList ? <Weather /> : ""}
      <button onClick={AddMethod} className={!addList ? "add" : "remove"}>
        {!addList ? "+" : "-"}
      </button>
    </div>
  );
}

export default App;
