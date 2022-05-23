import React from "react";
import "./Result.css";

const Result = ({ count, total }) => {
  return (
    <div className="result">
      <img src="https://country-quiz-iota.vercel.app/assets/undraw_winners_ao2o%202.04e61641.svg" />
      <div className="result_content">
        <p className="result_title">Результат:</p>
        <p className="results">
          Правильных ответов
          <span className="result_value">{` ${count} `}</span>
          из
          {` ${total}`}
        </p>
      </div>
    </div>
  );
};

export default Result;
