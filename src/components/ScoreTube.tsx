import React from 'react';

type Score = {
    score: number
};

const scoreMax = 10000;

function ScoreTube({score}: Score) {
    const tubeHeight = score/scoreMax < 1? score*100/scoreMax+"%":"100%";
    const complete = score >= scoreMax;
  return (
    <div className="flex flex-col items-center mx-9 space-y-9">
        <div className="flex flex-col justify-end w-6 h-1/2 border-4 border-stone-800 rounded-full">
            <div className="w-4.5 bg-rose-500 rounded-full" style={{height: tubeHeight}}/>
        </div>
        <span className="font-bold font-sans w-18 px-4 rounded-full bg-orange-300 border-lime-950">
            {score}
        </span>
        {complete && <span className="font-mono font-semibold">SUCCESS!</span>}
    </div>
  )
}

export default ScoreTube;