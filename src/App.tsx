import CandyBoard from "./components/CandyBoard";

function App() {
  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 via-sky-500 via-30% to-emerald-500 w-dvw h-dvh">
      <div className="flex justify-center w-1/4 p-4 border-[0.5rem] rounded-full border-y-sky-600  bg-cyan-200">
        <h1 className="min-[320px]:text-xl lg:text-5xl text-center font-bold text-neutral-600">
          Candy Crush
        </h1>
      </div>
      <div className="lg:m-20 min-[320px]:m-5">
        <CandyBoard />
      </div>
    </div>
  );
}

export default App;
