import ColorBoard from './components/ColorBoard';

function App() {
  return (
    <div className="flex flex-col justify-center bg-sky-200 w-dvw h-dvh">
      <div className="flex justify-center">
        <h1 className="w-1/2 text-3xl text-center font-bold text-neutral-600 p-4 border-b-4 border-teal-500">Candy Crush Board</h1>
      </div>
      <ColorBoard/>
    </div>
  );
}

export default App;
