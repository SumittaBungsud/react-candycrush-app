import {useState, useEffect} from 'react';

const colorList: string[] = [
    "#ff71ce",
    "#0057e7",
    "#05ffa1",
    "#b967ff",
    "#fffb96",
    "#ee4035",
    "#f37736",
    "#36abb5",
];

function ColorBoard() {
    const [colorTemplate, setColorTemplate] = useState<Array<string>>([]);

    const randomColors = () => {
        const colorset: string[] = [];

        function shuffle() {
            if (colorset.length == 64){
                return
            }
            const randomElement = colorList[Math.floor(Math.random()*colorList.length)];
            colorset.push(randomElement);
            shuffle();
        }
        shuffle();
        setColorTemplate(colorset);
    }

    useEffect(() => {
        randomColors();  
    } ,[]);

  return (
    <div className="flex justify-center py-4">
        <div className="flex flex-wrap w-[448px] h-[448px] bg-neutral-200">
            {colorTemplate.map((color, index:number) => (
                <img 
                    key={index}
                    className="w-14 h-14" 
                    style={{backgroundColor: color}}
                    draggable={true}
                />
            ))}
        </div>
    </div>
  )
}

export default ColorBoard;