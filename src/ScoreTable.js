import React from 'react';
import PropTypes from 'prop-types'

const ScoreTable = ({guesses, p1IsNext, player1, player2}) => (
  <table className="score-table">
    <thead><tr><th>Guesses</th><th colSpan="2">Score</th></tr></thead>
    <tbody>
      <tr>
        <td rowSpan="2">{guesses}</td>
        <td><div className={p1IsNext?"":"active"}>Player1</div></td>
        <td>{player1.score}</td>
      </tr>
      <tr>
        <td><div className={p1IsNext?"active":""}>Player2</div></td>
        <td>{player2.score}</td>
      </tr>
    </tbody>
  </table>
)

ScoreTable.propTypes = {
  guesses: PropTypes.number,
  p1IsNext: PropTypes.bool,
  player1: PropTypes.object,
  player2: PropTypes.object,
}
export default ScoreTable