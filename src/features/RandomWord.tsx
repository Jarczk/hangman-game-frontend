import React, {useEffect, useState} from "react";

function RandomWord() {
  return fetch("http://localhost:5000/random", {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }).then(async function (response) {
    const {word_text} = await response.json();
    return word_text.toUpperCase();
  })
    .catch(function (error) {
      console.log('Request failed', error);
    });
}

export default RandomWord