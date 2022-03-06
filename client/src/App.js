import Nav from "./components/Nav/Nav";
import Room from "./components/Room/Room";

function App() {
  return (
    <div className="App">
      <Nav />
      <Room gameId={69} />
    </div>
  );
}

export default App;
