import React, {useEffect, useRef, useState} from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

//export let keyboardInput = ""

function KeyboardComponent(props: { onInputChange: (arg0: React.SetStateAction<string>) => void; }) {
  const [input, setInput] = useState('');
  const [layout, setLayout] = useState("default");
  const keyboard = useRef();

  const onChange = (input: React.SetStateAction<string>) => {
    //setInput(input);
  };

  const handleShift = () => {
    const newLayoutName = layout === "default" ? "shift" : "default";
    setLayout(newLayoutName);
  };

  const onKeyPress = (button: string) => {
    if(button !== 'RESTART'){
      //console.log("Button pressed", button);
      // @ts-ignore
      keyboard.current.addButtonTheme(button, 'keyboardDisabled');
    } else {
      // @ts-ignore
      keyboard.current.removeButtonTheme(layout2, "keyboardDisabled");
    }
    props.onInputChange(button);

  };


  const onChangeInput = (event: { target: { value: any; }; }) => {
    const input = event.target.value;
    setInput(input);
    // @ts-ignore
    keyboard.current.setInput(input);
  };
  let layout2 = "Q W E R T Y U I O P A S D F G H J K L Z X C V B N M"
  /*
  <input
        value={input}
        placeholder={"Tap on the virtual keyboard to start"}
        onChange={onChangeInput}
        readOnly={true}
      />
   */
  return (
    <div style={{maxWidth: "1200px"}}>

      <Keyboard
        keyboardRef={r => (keyboard.current = r)}
        onChange={onChange}
        onKeyPress={onKeyPress}
        theme={"hg-theme-default hg-layout-default myTheme"}
        layoutName={layout}
        layout={{
          default: [
            "Q W E R T Y U I O P",
            'A S D F G H J K L',
            "Z X C V B N M",
            "RESTART"
          ]
        }}

      />
    </div>
  )
}

export default KeyboardComponent