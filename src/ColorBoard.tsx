import {useState, useEffect, ChangeEvent} from 'react';
import blueCandy from './images/blue-candy.png'
import greenCandy from './images/green-candy.png'
import orangeCandy from './images/orange-candy.png'
import purpleCandy from './images/purple-candy.png'
import redCandy from './images/red-candy.png'
import yellowCandy from './images/yellow-candy.png'
import blank from './images/blank.png'

const colorList: string[] = [
    blueCandy,
    orangeCandy,
    purpleCandy,
    redCandy,
    yellowCandy,
    greenCandy
];

const width = 8;

function ColorBoard() {
    const [colorTemplate, setColorTemplate] = useState<string[]>([]);
    const [scoreTotal, setScoreTotal] = useState<number>(0);
    const [blockBeingDragged, setBlockBeingDragged] = useState<any>();
    const [blockBeingPlaced, setBlockBeingPlaced] = useState<any>();

    const createColorBoard = () => {
        const colorset: string[] = [];
        function shuffle() {
            if (colorset.length === width*width){
                return
            }
            const randomElement = colorList[Math.floor(Math.random()*colorList.length)];
            colorset.push(randomElement);
            shuffle();
        }
        shuffle();
        setColorTemplate(colorset);
    }

    const matchedConditions = (i:number) => {
        const conditionsForRows = [
            [i, i+1, i+2],
            [i, i+1, i+2, i+3],
            [i, i+1, i+2, i+3, i+4],
            [i, i+1, i+2, i+3, i+4, i+5],
            [i, i+1, i+2, i+3, i+4, i+5, i+6],
            [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7]
        ];
        const conditionsForColumns = [
            [i, i+width, i+width*2],
            [i, i+width, i+width*2, i+width*3],
            [i, i+width, i+width*2, i+width*3, i+width*4],
            [i, i+width, i+width*2, i+width*3, i+width*4, i+width*5],
            [i, i+width, i+width*2, i+width*3, i+width*4, i+width*5, i+width*6],
            [i, i+width, i+width*2, i+width*3, i+width*4, i+width*5, i+width*6, i+width*7]
        ];
        return {
                row: conditionsForRows, 
                col: conditionsForColumns
               };
    }

    const checkForMatchThree = () => {
        for (let i = 0; i < width*width; i++){
            const decidedColor = colorTemplate[i];
            const isBlank = colorTemplate[i] === blank;
            const conditionRow = matchedConditions(i).row[0];
            const conditionCol = matchedConditions(i).col[0];

            if (i < width*6){
                if (conditionCol.every((index) => colorTemplate[index] === decidedColor && !isBlank)){
                    conditionCol.forEach((index) => colorTemplate[index] = blank);
                    setScoreTotal((scoreTotal) => scoreTotal+100);
                    return true;
                }
            }
            if (i < Math.floor(i/width)*width+6){
                if (conditionRow.every((index) => colorTemplate[index] === decidedColor && !isBlank)){
                    conditionRow.forEach((index) => colorTemplate[index] = blank);
                    setScoreTotal((scoreTotal) => scoreTotal+100);
                    return true;
                }
            }
        }
    }

    const checkForMatchFour = () => {
        for (let i = 0; i < width*width; i++){
            const decidedColor = colorTemplate[i];
            const isBlank = colorTemplate[i] === blank;
            const conditionRow = matchedConditions(i).row[1];
            const conditionCol = matchedConditions(i).col[1];

            if (i < width*5){
                if (conditionCol.every((index) => colorTemplate[index] === decidedColor && !isBlank)){
                    conditionCol.forEach((index) => colorTemplate[index] = blank);
                    setScoreTotal((scoreTotal) => scoreTotal+300);
                    return true;
                }
            }
            if (i < Math.floor(i/width)*width+5){
                if (conditionRow.every((index) => colorTemplate[index] === decidedColor && !isBlank)){
                    conditionRow.forEach((index) => colorTemplate[index] = blank);
                    setScoreTotal((scoreTotal) => scoreTotal+300);
                    return true;
                }
            }
        }
    }

    const checkForMatchFive = () => {
        for (let i = 0; i < width*width; i++){
            const decidedColor = colorTemplate[i];
            const isBlank = colorTemplate[i] === blank;
            const conditionRow = matchedConditions(i).row[2];
            const conditionCol = matchedConditions(i).col[2];

            if (i < width*4){
                if (conditionCol.every((index) => colorTemplate[index] === decidedColor && !isBlank)){
                    conditionCol.forEach((index) => colorTemplate[index] = blank);
                    setScoreTotal((scoreTotal) => scoreTotal+500);
                    return true;
                }
            }
            if (i < Math.floor(i/width)*width+4){
                if (conditionRow.every((index) => colorTemplate[index] === decidedColor && !isBlank)){
                    conditionRow.forEach((index) => colorTemplate[index] = blank);
                    setScoreTotal((scoreTotal) => scoreTotal+500);
                    return true;
                }
            }
        }
    }

    const moveIntoSquareBelow = () => {
        for (let i = 0; i < width*7; i++) {
            if (i < width && colorTemplate[i] === blank) {
                let randomNumber = colorList[Math.floor(Math.random() * colorList.length)];
                colorTemplate[i] = randomNumber;
            }

            if ((colorTemplate[i + width]) === blank) {
                colorTemplate[i + width] = colorTemplate[i];
                colorTemplate[i] = blank;
            }
        }
    }
    
    const dragEnd = () => {
        const currentBlockId = parseInt(blockBeingDragged.getAttribute('data-id'));
        const dropBlockId = parseInt(blockBeingPlaced.getAttribute('data-id'));
        const validMoves = [
            blockBeingDragged - 1,
            blockBeingDragged - width,
            blockBeingDragged + 1,
            blockBeingDragged + width
        ];

        colorTemplate[currentBlockId] = blockBeingPlaced.getAttribute('src');
        colorTemplate[dropBlockId] = blockBeingDragged.getAttribute('src');

        const isFive = checkForMatchFive();
        const isFour = checkForMatchFour();
        const isThree = checkForMatchThree();

        if (validMoves.includes(blockBeingPlaced) && blockBeingPlaced && isThree || isFour || isFive){
            setBlockBeingDragged(null);
            setBlockBeingPlaced(null);
        } else {
            colorTemplate[currentBlockId] = blockBeingDragged.getAttribute('src');
            colorTemplate[dropBlockId] = blockBeingPlaced.getAttribute('src');
            setColorTemplate([...colorTemplate]);
        }
    }

    useEffect(() => {
        createColorBoard(); 
    },[])

    useEffect(() => {
        const timer = setInterval(() => {
            checkForMatchFive();
            checkForMatchFour();
            checkForMatchThree();
            moveIntoSquareBelow();
            setColorTemplate([...colorTemplate]);
        }, 200);
        
        return () => clearInterval(timer);

    } ,[checkForMatchFive, checkForMatchFour, checkForMatchThree]);

  return (
    <div className="flex justify-center py-4">
        <div className="flex flex-wrap w-[448px] h-[448px] bg-neutral-100">
            {colorTemplate.map((color, index:number) => (
                <img 
                    key={index}
                    data-id={index}
                    alt={color}
                    src={color}
                    className="w-14 h-14" 
                    style={{backgroundColor: color}}
                    draggable={true}
                    onDrag={(e) => setBlockBeingDragged(e.target)}
                    onDrop={(e) => setBlockBeingPlaced(e.target)}
                    onDragEnd={dragEnd}
                    onDragOver={(e) => e.preventDefault()}
                    onDragEnter={(e) => e.preventDefault()}
                    onDragLeave={(e) => e.preventDefault()}
                />
            ))}
        </div>
    </div>
  )
}

export default ColorBoard;