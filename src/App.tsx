import Game from "./components/Game";
import { LetterDemo } from "./components/Letter";


function App() {
  return (
    <div className="min-h-screen bg-slate-800 text-gray-200">
      <div className="container mx-auto p-16">
        <LetterDemo />
      </div>
    </div>
  );
}

export default App;
