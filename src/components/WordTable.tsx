import React, {useEffect, useState} from "react";
import {Table, TableCell, TableContainer, TableHead, TableRow, TableBody} from "@mui/material";
import Paper from '@mui/material/Paper';

const WordTable = () => {
  const [word, setWords] = useState<any[]>([]);
  const fetchWords = async () => {

    const result = await fetch("http://localhost:5000/words", {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(async function (response) {
      const words = await response.json();
      setWords(words);
      console.log('Request succeeded with JSON response', response);
    })
      .then(function (data) {
        console.log('Request succeeded with JSON response', data);
      })
      .catch(function (error) {
        console.log('Request failed', error);
      });
  };
  useEffect(() => {
    fetchWords()
  }, []);
  return (
    <TableContainer sx={{width: 300}}>
      <Table component={Paper} sx={{backgroundColor: "#FCFBFA"}}>
        <TableHead>
          <TableCell sx={{textAlign: "center"}}>Wyrazy</TableCell>
        </TableHead>
        <TableBody>
          {word.map((row) => (
            <TableRow
              key={row._id}
              sx={{'&:last-child td, &:last-child th': {border: 0}}}
            >
              <TableCell component="th" scope="row" sx={{textAlign: "center"}}>{row.word_text}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default WordTable