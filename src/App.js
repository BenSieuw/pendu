import React, { Component } from 'react';
import './App.css';

import Letter from './Letter'
import ScoreTable from './ScoreTable'

const randomWords = require('random-words');
const LETTERS = [
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
  "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
]

class App extends Component {
  state = {
    phrase: this.getPhrase(),
    usedLetters: new Set(),
    player1: {score:0},
    player2: {score:0},
    p1IsNext: false,
    guesses: 0,
  }

  getPhrase() {
    let phrase = randomWords(5)
    return phrase[0].toUpperCase()
  }

  // Produit une représentation textuelle de l’état de la partie,
  // chaque lettre non découverte étant représentée par un _underscore_.
  // (CSS assurera de l’espacement entre les lettres pour mieux
  // visualiser le tout).
  computeDisplay(phrase, usedLetters) {
    console.dir(usedLetters)
    return phrase.replace(
      /\w/g,
      (letter) => (usedLetters.has(letter) ? letter : '_')
    )
  }

  // Arrow fx for binding
  handleLetterClick = letter => {
    console.log(letter)
    let {usedLetters, player1, player2, p1IsNext, guesses} = this.state
    usedLetters.add(letter)
    if (!this.state.phrase.includes(letter)) {
      guesses++
      this.drawPendu(guesses)
    } else {
      if (this.state.p1IsNext) {
        player2.score++
      } else {
        player1.score++
      }
    }
    p1IsNext = !p1IsNext
    this.setState({
      usedLetters: usedLetters,
      player1,
      player2,
      p1IsNext: p1IsNext,
      guesses,
    })
  }

  drawPendu(guesses) {
    let canvas = document.getElementsByTagName("canvas");
    let ctx = canvas[0].getContext("2d");
    ctx.strokeStyle = "#FFFFFF";
    switch (guesses) {
      case 1 :
        ctx.beginPath();
        ctx.arc(180,85,15,0,2*Math.PI);
        break;
      case 2 :
        ctx.beginPath();
        ctx.moveTo(180,100);
        ctx.lineTo(180,180);
        break;
      case 3 :
        ctx.beginPath();
        ctx.moveTo(180,110);
        ctx.lineTo(160,150);
        break;
      case 4 :
        ctx.beginPath();
        ctx.moveTo(180,110);
        ctx.lineTo(200,150);
        break;
      case 5 :
        ctx.beginPath();
        ctx.moveTo(180,180);
        ctx.lineTo(200,230);
        break;
      case 6 :
        ctx.beginPath();
        ctx.moveTo(180,180);
        ctx.lineTo(160,230);
        break;
    }
    ctx.stroke();
  }

  componentDidMount() {
    document.addEventListener("keydown", event => {
      this.keyPressed(event.key)
    });
    let canvas = document.getElementsByTagName("canvas");
    let ctx = canvas[0].getContext("2d");
    ctx.strokeStyle = "#FFFFFF";
    ctx.moveTo(25,270);
    ctx.lineTo(35,260);
    ctx.lineTo(150,260);
    ctx.lineTo(160,270);
    ctx.moveTo(67.5,260);
    ctx.lineTo(67.5,50);
    ctx.lineTo(180,50);
    ctx.lineTo(180,70);
    ctx.stroke();
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", event => {
      this.keyPressed(event.key)
    });
  }

  keyPressed(key) {
    LETTERS.includes(key.toUpperCase()) && this.handleLetterClick(key.toUpperCase())
  }

  // Arrow fx for binding
  reset = () => {
    let canvas = document.getElementsByTagName("canvas");
    let ctx = canvas[0].getContext("2d");
    ctx.clearRect(159, 69, 200, 230);
    let newState = {
      phrase: this.getPhrase(),
      usedLetters: new Set(),
      p1IsNext: false,
      guesses:0,
    }
    this.setState(newState);
  }

  render() {
    const masque = this.computeDisplay(this.state.phrase,this.state.usedLetters)
    if (masque.includes('_') && this.state.guesses<6) {
      return (
        <div className="App">
          <header>
            <canvas width="250" height="300"></canvas>
            <div className="masque">
              {masque}
            </div>
          </header>
          <div className="letters-box">
            {LETTERS.map((letter,index) => (
              <Letter
                className={this.state.usedLetters.has(letter) ? "letter used-letter" : "letter" }
                letter={letter}
                key={index}
                onClick={this.handleLetterClick}
              />
            ))}
          </div>
          <div class="sinfo">Click a letter or use your keyboard</div>
          <ScoreTable
            guesses={this.state.guesses}
            p1IsNext={this.state.p1IsNext}
            player1={this.state.player1}
            player2={this.state.player2}
          />
        </div>
      )
    } else {
      return (
        <div className="App">
          <header>
            <canvas width="250" height="300"></canvas>
            <div className="masque">
              {masque}
            </div>
          </header>
          <button className="reset-button" onClick={this.reset}>
            {this.state.guesses<6?"Well done! One more game?":"You lost... But hang in there!"}
          </button>
          <ScoreTable
            guesses={this.state.guesses}
            p1IsNext={this.state.p1IsNext}
            player1={this.state.player1}
            player2={this.state.player2}
          />
        </div>
      )
    }
  }
}

export default App;
