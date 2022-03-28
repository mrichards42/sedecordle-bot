import MultiGame from "./components/MultiGame";

function App() {
  return (
    <div className="min-h-screen bg-slate-800 text-gray-200">
      <div className="container mx-auto">
        <MultiGame count={16} size="md" />
      </div>
    </div>
  );
}

export default App;
