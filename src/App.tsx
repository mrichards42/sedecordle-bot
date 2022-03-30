import GameContainer from "./components/GameContainer";

function App() {
  return (
    <div className="h-full bg-slate-800 text-gray-200">
      <div className="container h-full mx-auto">
        <GameContainer defaultCount={16} />
      </div>
    </div>
  );
}

export default App;
