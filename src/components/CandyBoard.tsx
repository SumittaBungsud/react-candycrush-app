import React, { useState, useEffect } from "react";
import blueCandy from "../images/blue-candy.png";
import greenCandy from "../images/green-candy.png";
import orangeCandy from "../images/orange-candy.png";
import purpleCandy from "../images/purple-candy.png";
import redCandy from "../images/red-candy.png";
import yellowCandy from "../images/yellow-candy.png";
import blank from "../images/blank.png";
import ScoreTube from "./ScoreTube";

const colorList: string[] = [
  blueCandy,
  orangeCandy,
  purpleCandy,
  redCandy,
  yellowCandy,
  greenCandy,
];

const width = 8;

function CandyBoard() {
  const [colorTemplate, setColorTemplate] = useState<string[]>([]);
  const [scoreTotal, setScoreTotal] = useState<number>(0);
  const [blockBeingDragged, setBlockBeingDragged] = useState<any>();
  const [blockBeingPlaced, setBlockBeingPlaced] = useState<any>();

  const createColorBoard = () => {
    const colorset: string[] = [];
    function shuffle() {
      if (colorset.length === width * width) {
        return;
      }
      const randomElement =
        colorList[Math.floor(Math.random() * colorList.length)];
      colorset.push(randomElement);
      shuffle();
    }
    shuffle();
    setColorTemplate(colorset);
  };

  const matchedConditions = (i: number) => {
    const conditionsForRows = [
      [i, i + 1, i + 2],
      [i, i + 1, i + 2, i + 3],
      [i, i + 1, i + 2, i + 3, i + 4],
      [i, i + 1, i + 2, i + 3, i + 4, i + 5],
      [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6],
      [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7],
    ];
    const conditionsForColumns = [
      [i, i + width, i + width * 2],
      [i, i + width, i + width * 2, i + width * 3],
      [i, i + width, i + width * 2, i + width * 3, i + width * 4],
      [
        i,
        i + width,
        i + width * 2,
        i + width * 3,
        i + width * 4,
        i + width * 5,
      ],
      [
        i,
        i + width,
        i + width * 2,
        i + width * 3,
        i + width * 4,
        i + width * 5,
        i + width * 6,
      ],
      [
        i,
        i + width,
        i + width * 2,
        i + width * 3,
        i + width * 4,
        i + width * 5,
        i + width * 6,
        i + width * 7,
      ],
    ];
    return {
      row: conditionsForRows,
      col: conditionsForColumns,
    };
  };

  const checkForMatchThree = () => {
    for (let i = 0; i < width * width; i++) {
      const decidedColor = colorTemplate[i];
      const isBlank = colorTemplate[i] === blank;
      const conditionRow = matchedConditions(i).row[0];
      const conditionCol = matchedConditions(i).col[0];

      if (i < width * 6) {
        if (
          conditionCol.every(
            (index) => colorTemplate[index] === decidedColor && !isBlank
          )
        ) {
          conditionCol.forEach((index) => (colorTemplate[index] = blank));
          setScoreTotal((scoreTotal) => scoreTotal + 100);
          return true;
        }
      }
      if (i < Math.floor(i / width) * width + 6) {
        if (
          conditionRow.every(
            (index) => colorTemplate[index] === decidedColor && !isBlank
          )
        ) {
          conditionRow.forEach((index) => (colorTemplate[index] = blank));
          setScoreTotal((scoreTotal) => scoreTotal + 100);
          return true;
        }
      }
    }
  };

  const checkForMatchFour = () => {
    for (let i = 0; i < width * width; i++) {
      const decidedColor = colorTemplate[i];
      const isBlank = colorTemplate[i] === blank;
      const conditionRow = matchedConditions(i).row[1];
      const conditionCol = matchedConditions(i).col[1];

      if (i < width * 5) {
        if (
          conditionCol.every(
            (index) => colorTemplate[index] === decidedColor && !isBlank
          )
        ) {
          conditionCol.forEach((index) => (colorTemplate[index] = blank));
          setScoreTotal((scoreTotal) => scoreTotal + 200);
          return true;
        }
      }
      if (i < Math.floor(i / width) * width + 5) {
        if (
          conditionRow.every(
            (index) => colorTemplate[index] === decidedColor && !isBlank
          )
        ) {
          conditionRow.forEach((index) => (colorTemplate[index] = blank));
          setScoreTotal((scoreTotal) => scoreTotal + 200);
          return true;
        }
      }
    }
  };

  const checkForMatchFive = () => {
    for (let i = 0; i < width * width; i++) {
      const decidedColor = colorTemplate[i];
      const isBlank = colorTemplate[i] === blank;
      const conditionRow = matchedConditions(i).row[2];
      const conditionCol = matchedConditions(i).col[2];

      if (i < width * 4) {
        if (
          conditionCol.every(
            (index) => colorTemplate[index] === decidedColor && !isBlank
          )
        ) {
          conditionCol.forEach((index) => (colorTemplate[index] = blank));
          setScoreTotal((scoreTotal) => scoreTotal + 400);
          return true;
        }
      }
      if (i < Math.floor(i / width) * width + 4) {
        if (
          conditionRow.every(
            (index) => colorTemplate[index] === decidedColor && !isBlank
          )
        ) {
          conditionRow.forEach((index) => (colorTemplate[index] = blank));
          setScoreTotal((scoreTotal) => scoreTotal + 400);
          return true;
        }
      }
    }
  };

  const moveIntoSquareBelow = () => {
    for (let i = 0; i < width * 7; i++) {
      if (i < width && colorTemplate[i] === blank) {
        let randomNumber =
          colorList[Math.floor(Math.random() * colorList.length)];
        colorTemplate[i] = randomNumber;
      }

      if (colorTemplate[i + width] === blank) {
        colorTemplate[i + width] = colorTemplate[i];
        colorTemplate[i] = blank;
      }
    }
  };

  const dragEnd = () => {
    const currentBlockId = parseInt(blockBeingDragged.getAttribute("data-id"));
    const dropBlockId = parseInt(blockBeingPlaced.getAttribute("data-id"));
    const validMoves = [
      currentBlockId - 1,
      currentBlockId - width,
      currentBlockId + 1,
      currentBlockId + width,
    ];

    if (validMoves.includes(dropBlockId)) {
      colorTemplate[currentBlockId] = blockBeingPlaced.getAttribute("src");
      colorTemplate[dropBlockId] = blockBeingDragged.getAttribute("src");

      const isFive = checkForMatchFive();
      const isFour = checkForMatchFour();
      const isThree = checkForMatchThree();

      if (isFour || isThree || isFive) {
        setBlockBeingDragged(null);
        setBlockBeingPlaced(null);
        setColorTemplate([...colorTemplate]);
      } else {
        colorTemplate[currentBlockId] = blockBeingDragged.getAttribute("src");
        colorTemplate[dropBlockId] = blockBeingPlaced.getAttribute("src");
        setColorTemplate([...colorTemplate]);
      }
    }
  };

  useEffect(() => {
    createColorBoard();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      checkForMatchFive();
      checkForMatchFour();
      checkForMatchThree();
      moveIntoSquareBelow();
      setColorTemplate([...colorTemplate]);
    }, 150);

    return () => clearInterval(timer);
  }, [checkForMatchFive, checkForMatchFour, checkForMatchThree]);

  return (
    <div className="flex justify-center py-4">
      <div className="flex flex-wrap lg:w-[29rem] lg:h-[29rem] min-[320px]:w-[15.25rem] min-[320px]:h-[15.25rem] bg-neutral-100 border-8 rounded-3xl border-emerald-300">
        {colorTemplate.map((color, index: number) => (
          <img
            key={index}
            data-id={index}
            alt={color}
            src={color}
            className="lg:w-14 lg:h-14 min-[320px]:w-7 min-[320px]:h-7"
            style={{ backgroundColor: color }}
            draggable={true}
            onTouchMove={(e) => setBlockBeingDragged(e.target)}
            onTouchEnd={async (e) => {
              await setBlockBeingPlaced(e.target);
              dragEnd();
            }}
            onDrag={(e) => setBlockBeingDragged(e.target)}
            onDrop={(e) => setBlockBeingPlaced(e.target)}
            onDragEnd={dragEnd}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
          />
        ))}
      </div>
      <ScoreTube score={scoreTotal} />
    </div>
  );
}

export default CandyBoard;
