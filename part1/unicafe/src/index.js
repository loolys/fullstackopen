import React, { useState } from "react";
import ReactDOM from "react-dom";

const Header = props => <h1>{props.title}</h1>;

const Button = props => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  if (good === 0 && bad === 0 && neutral === 0) {
    return <p>No feedback given</p>;
  }
  return (
    <table>
      <tbody>
        <Statistic text="good" value={good} />
        <Statistic text="neutral" value={neutral} />
        <Statistic text="bad" value={bad} />
        <tr>
          <td>all</td>
          <td>{good + neutral + bad}</td>
        </tr>
        <tr>
          <td>average</td>
          <td>{(good - bad) / (good + neutral + bad)}</td>
        </tr>
        <tr>
          <td>positive</td>
          <td>{(good / (good + neutral + bad)) * 100}%</td>
        </tr>
      </tbody>
    </table>
  );
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const setToGood = newValue => {
    setGood(newValue);
  };

  const setToNeutral = newValue => {
    setNeutral(newValue);
  };

  const setToBad = newValue => {
    setBad(newValue);
  };

  return (
    <div>
      <Header title="Give Feedback" />
      <Button handleClick={() => setToGood(good + 1)} text="Good" />
      <Button handleClick={() => setToNeutral(neutral + 1)} text="Neutral" />
      <Button handleClick={() => setToBad(bad + 1)} text="Bad" />

      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
