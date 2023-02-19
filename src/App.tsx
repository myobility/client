import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <div>
        <button type="button" id="join">
          Join
        </button>
        <button type="button" id="leave">
          Leave
        </button>
      </div>
    </div>
  );
}

export default App;
