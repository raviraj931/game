import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [boxCount ,setBoxCount]=useState(6)
  const [boxList, setBoxList]=useState([])
  const [selectedBoxList, setSelectedBoxList]=useState([])
  const [level,setLevel]=useState(1)
  const [coloredBox, setColoredBox]=useState([])
  const [isColoredBox, setIsColoredBox]=useState(true)
  const [wrongList, setWrongList]=useState([])
  const [lifeLine, setLifeLine]=useState(5)
  const [lifeLineList, setLifeLineList]=useState([])
  const [color, setColor]=useState("#FFFF00")

  useEffect(() => {
    resetGame()
  }, [level])

  const resetGame = () =>{
    if(level == 1){
      setLifeLine(5);
      setLifeLineList(Array.from(Array(5).keys()))
      setColor("#FFFF00")
    }else{
      let maxVal = 0xFFFFFF; // 16777215
      let randomNumber = Math.random() * maxVal; 
      randomNumber = Math.floor(randomNumber);
      randomNumber = randomNumber.toString(16);
      setColor("#"+randomNumber.padStart(6, 0))
    }
    setWrongList([])
      setSelectedBoxList([])
    setIsColoredBox(true)
    const boxes=boxCount+(level*3);
    const tempLevelBoxes=Array.from(Array(boxes).keys())
    setBoxList(tempLevelBoxes)
    const coloredBoxCount=Math.floor(boxes/2)
    var tempRendomColoredBoxes = [];
    while(tempRendomColoredBoxes.length < coloredBoxCount){
        var r = Math.floor(Math.random() * tempLevelBoxes.length);
        if(tempRendomColoredBoxes.indexOf(r) === -1) tempRendomColoredBoxes.push(r);
    }
    setColoredBox(tempRendomColoredBoxes)
    setTimeout(()=>{
      setIsColoredBox(false)
    },3000)
  }

  const handleClick=(box)=>{
    if(!isColoredBox && coloredBox.length > selectedBoxList.length && !selectedBoxList.includes(box)){
      if(coloredBox.includes(box)){
        setSelectedBoxList([...selectedBoxList,box])
      }else{
        if(!wrongList.includes(box)){
          let data=lifeLine-1;
          setLifeLine(data)
          setLifeLineList(Array.from(Array(data).keys()))
          setWrongList([...wrongList,box])
        }
      }
    }
  }

  useEffect(()=>{
    if(lifeLine==0){
      alert("Game Over!")
      setLevel(1)
      setWrongList([])
      setSelectedBoxList([])
      resetGame()
    }
  },[lifeLine])

  useEffect(()=>{
    if(selectedBoxList.length>0){
    let temp=selectedBoxList.map(x=>coloredBox.includes(x)).filter(x=>x==true).length == coloredBox.length;
    if(temp){
      setTimeout(()=>{
        setLevel(level+1)
        setWrongList([])
        setSelectedBoxList([])
      },2000)
    }
  }
  },[selectedBoxList])
  

  return (
    <div className="App">
     <div className='title'>Level {level}</div>
     <div className='title'>LifeLine {lifeLine}</div>
     <div className='maincontent'>
     <div className='mainbox'>
      {boxList.map((box,index)=>{
        return(
          <div className={`box ${!isColoredBox && wrongList.includes(box)?'de-active':''}`}
          style={{ backgroundColor: (isColoredBox ? (coloredBox.includes(box)?color:'#fff'):(selectedBoxList.includes(box)?color:(wrongList.includes(box)?'red':'#fff'))  ) }}
          onClick={()=>handleClick(box)}>
            {box}
          </div>
        )
      })}
    </div>
    </div>
    <div className='mainlifeline'>
      {Array.from(Array(5).keys()).map((x)=>(
        <>
        <div className={`lifeline ${lifeLineList.includes(x)?'':'active'}`}>
        </div>
        </>
      ))}
    </div>
    </div>
  );
}

export default App;
