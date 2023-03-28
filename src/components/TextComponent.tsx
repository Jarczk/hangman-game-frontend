import React, {useEffect} from "react";

const TextComponent = (props: { text: string, length: number, status: boolean, winner: boolean }) => {
  let modifiedText = "";
  for (let i = 0; i < props.text.length; i++) {
    modifiedText += props.text.charAt(i);
  }
  if (props.text.length < props.length) {
    for (let i = props.text.length; i < props.length; i++) {
      modifiedText += "_";
    }
  }

  const modifiedText2 = modifiedText
    .split("")
    .map((char, index) => {
      return <span key={index}>{' '}<u>{char}</u>{' '}</span>
    })
  let color = '';
  if(modifiedText.includes('_')) color = 'normal'
  if(props.status){
    if(props.winner) color = 'winner'
    else color = 'looser'
  }
  //console.log(modifiedText2.toString())
  return (
    <div className={color}>
      <p style={{
        wordSpacing: '30px',
        fontSize: '450%',
        fontWeight: '700'
      }}>{modifiedText2}</p>
    </div>
  )
}

export default TextComponent