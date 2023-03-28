import React, {SetStateAction, useEffect, useRef, useState} from "react";
import './Game.css'
import RandomWord from "../features/RandomWord";
import TextComponent from "../components/TextComponent";
import KeyboardComponent from "../components/KeyboardComponent";
import DrawingComponent from "../components/DrawingComponent";
import MessageComponent from "../components/MessageComponent";


const Game = () => {
  const [wordToGuess, setWordToGuess] = useState<any>('');
  const [inputValue, setInputValue] = useState('');
  const [guessed, setGuessed] = useState('');
  const [isWinner, setWinner] = useState<boolean>(false);
  const [isEnd, setEnd] = useState<boolean>(false);
  const [reload, reloadPage] = useState(false);
  const [badCounter, setBads] = useState(0);
  const [message, setMessage] = useState('')

  async function fetchRandomWord() {
    const word = await RandomWord();
    setWordToGuess(word);
  }

  useEffect(() => {
    fetchRandomWord();
    restartGame();

  }, []);


  function checkIsWinner() {
    if (wordToGuess === guessed) { //win game
      setEnd(true)
      setWinner(true)
      setMessage("wygrałeś")
    } else if (badCounter >= 6) { //loose game
      setEnd(true)
      setWinner(false);
      setMessage("przegrałeś")
    }
  }

  const handleInputChange = (arg0: SetStateAction<string>) => {
    if(arg0 === 'RESTART'){
      restartGame();
      return;
    }
    if (badCounter < 6 && !isEnd) {
      let newString = '';
      let isGood = false
      for (let i = 0; i < wordToGuess.length; i++) {
        if (arg0 === wordToGuess[i]) isGood = true;
        if (inputValue.indexOf(wordToGuess[i]) !== -1 || arg0 === wordToGuess[i])
          newString += wordToGuess[i];
        else
          newString += '_';
      }
      setGuessed(newString);
      setInputValue(inputValue + arg0);
      if (!isGood) setBads(badCounter + 1)
    } else {
      checkIsWinner()
    }
  }
  useEffect(() => checkIsWinner(), [guessed])

  function restartGame() {
    setInputValue('');
    setGuessed('');
    setEnd(false)
    setWinner(false)
    setMessage('')
    fetchRandomWord();
    setBads(0);
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>Game.tsx<br/>
      {wordToGuess}

      <DrawingComponent counter={badCounter}/>
      <MessageComponent message={message} />
      <TextComponent text={guessed} length={wordToGuess.length} status={isEnd} winner={isWinner}/>
      <div><KeyboardComponent onInputChange={handleInputChange}/></div>
    </div>
  )
}

export default Game
