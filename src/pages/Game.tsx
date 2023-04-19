import React, {SetStateAction, useEffect, useRef, useState} from "react";
import './Game.css'
import RandomWord from "../features/RandomWord";
import TextComponent from "../components/TextComponent";
import KeyboardComponent from "../components/KeyboardComponent";
import DrawingComponent from "../components/DrawingComponent";
import MessageComponent from "../components/MessageComponent";
import {ToastContainer, toast, TypeOptions} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


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
      toast.success('Super, wygrałeś!');
      toast.info('Zaloguj się aby zapisać swój wynik!');
    } else if (badCounter >= 6) { //loose game
      setEnd(true)
      setWinner(false);
      toast.error(() => <div>Niestety, przegrałeś!<br/>Poszukiwane słowo: <b>{wordToGuess}</b></div>);
      toast.info('Zaloguj się aby zapisać swój wynik!');
    }
  }

  const handleInputChange = (arg0: SetStateAction<string>) => {

    if (arg0 === 'RESTART') {
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
    }
    //checkIsWinner()
  }

  useEffect(() => {
    if(wordToGuess) checkIsWinner();

  }, [guessed, badCounter])

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
    <div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>Game.tsx<br/>
        {wordToGuess}

        <DrawingComponent counter={badCounter}/>
        <TextComponent text={guessed} length={wordToGuess.length} status={isEnd} winner={isWinner}/>
        <div><KeyboardComponent onInputChange={handleInputChange}/></div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}

export default Game
