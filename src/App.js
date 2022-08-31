import "./App.css";
import Operation from "./components/operatorButtons";

function App() {
  return (
    <div className="body">
      <div className="app">
        <header>
          <h3>Calculator</h3>
        </header>
        <Operation></Operation>
      </div>
    </div>
  );
}

export default App;
