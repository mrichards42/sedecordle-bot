import { LetterDemo } from "./components/Letter";

function App() {
  return (
    <div className="dark">
      <div className="min-h-screen dark:bg-slate-800 dark:text-gray-200">
        <div className="container mx-auto p-16">
          <LetterDemo />
        </div>
      </div>
    </div>
  );
}

export default App;
